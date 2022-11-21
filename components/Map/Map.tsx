import {useEffect, useState, FC} from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import {useLeafletContext} from "@react-leaflet/core";

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

import sampleGeoJson from "../../samples/cape-town.geojson.txt"

type MapProps = {
  children: JSX.Element
  className: String
}

//Geoman provides advanced editing capabilities (needed for MultiPolygons)
const EditingControls = () => {
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

        shape.layer.on("pm:edit", (e) => {
          const event = e;
          console.log(e)
          // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        });
      }
    });

    console.log(leafletContainer.pm.getGeomanLayers())

    leafletContainer.on("pm:globaleditmodetoggled", (e) => {
      console.log(e)
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


const Map: FC<MapProps> = ({children, className, geojsonObjects, ...rest}) => {
  const DEFAULT_CENTER = [-33.918861, 18.423300]

  let mapClassName = styles.map;
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  // TODO: remove sample
  const json = JSON.parse(sampleGeoJson)

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

  //  <ReactLeaflet.GeoJSON data={json}>
  return (
    <MapContainer className={mapClassName} center={DEFAULT_CENTER} zoom={12} minZoom={4}>
      <ReactLeaflet.TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        noWrap
      />
      <ReactLeaflet.GeoJSON data={json} />
      <EditingControls />
    </MapContainer>
  )
}

export default Map