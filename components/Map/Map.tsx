import { useEffect, FC } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import { useLeafletContext } from "@react-leaflet/core";

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'

// Advanced editing controls
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

import styles from './MapView.module.scss';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const {MapContainer} = ReactLeaflet;

type MapProps = {
  children: JSX.Element
  className: String
}

//Geoman provides advanced editing capabilities (needed for MultiPolygons)
const EditingControls = ({onUpdateGeoJson}) => {
  const context = useLeafletContext();

  useEffect(() => {
    const leafletContainer = context.layerContainer || context.map;

    leafletContainer.pm.addControls({
      drawMarker: false
    });

    leafletContainer.pm.setGlobalOptions({pmIgnore: false});

    leafletContainer.on("pm:create", (e) => {
      console.log(e)
      if (e.layer && e.layer.pm) {
        const shape = e;

        // enable editing of shape
        shape.layer.pm.enable();

        console.log(`object created: ${shape.layer.pm.getShape()}`);
        // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        leafletContainer.pm
          .getGeomanLayers(true)
          .bindPopup("i am whole")
          .openPopup();

        leafletContainer.pm
          .getGeomanLayers()
          .map((layer, index) => layer.bindPopup(`I am figure N° ${index}`));
      }
    });

    leafletContainer.on("pm:globaleditmodetoggled", (e) => {
      // Only update GeoJSON objects if edit mode was toggled from enabled to disabled, mirroring clicking "Finish"
      if (!e.enabled) {
        let layers = leafletContainer.pm.getGeomanLayers()
        let geoJsonArray = []
        layers.map((layer) => {
          let geojson = layer.toGeoJSON()
          geoJsonArray.push(geojson)
        })
        onUpdateGeoJson(geoJsonArray)
      }
    })

    leafletContainer.on("pm:remove", (e) => {
      console.log("object removed");
      // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
    });

    return () => {
      leafletContainer.pm.removeControls();
      leafletContainer.pm.setGlobalOptions({pmIgnore: true});
    };
  }, [context]);

  return null;
};


const Map: FC<MapProps> = ({children, className, geojsonObjects, onUpdateGeojson, ...rest}) => {
  const DEFAULT_CENTER = [-33.918861, 18.423300]

  let mapClassName = styles.map;
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} center={DEFAULT_CENTER} zoom={12} minZoom={4}>
      <ReactLeaflet.TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        noWrap
      />
      {geojsonObjects.map((geojson, index) => {
        return geojson ? <ReactLeaflet.GeoJSON key={index} data={geojson}/> : null
      })}
      <EditingControls onUpdateGeoJson={onUpdateGeojson}/>
    </MapContainer>
  )
}

export default Map