import {useEffect, useState, FC} from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import {EditControl} from "react-leaflet-draw"

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

import sampleGeoJson from "../../utils/samples/cape-town.geojson.txt"

type MapProps = {
  children: JSX.Element
  className: String
}

const MapComponent = () => {
  const map = ReactLeaflet.useMap()

  useEffect(() => {
    L.PM.setOptIn(true)

    map.pm.addControls({
      position: 'topright',
      drawCircle: false,
    });

    const json = JSON.parse(sampleGeoJson)

    let layer = L.geoJSON().addTo(map)
    layer.addData(json)

    map.pm.enableGlobalEditMode()
  }, [])


  const defaultMarkers = [[-33.918861, 18.423300]]
  const [markers, setMarkers] = useState(defaultMarkers)

  return (
    <><ReactLeaflet.TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      noWrap
    />
      {markers.map((marker) => {
        return (<ReactLeaflet.Marker position={marker}>
          <ReactLeaflet.Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </ReactLeaflet.Popup>
        </ReactLeaflet.Marker>)
      })}
    </>
  )
}


const Map: FC<MapProps> = ({children, className, geojsonObjects, ...rest}) => {
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

  //  <ReactLeaflet.GeoJSON data={json}>
  return (
    <MapContainer className={mapClassName} center={DEFAULT_CENTER} zoom={12} minZoom={4}>
      <MapComponent />
    </MapContainer>
  )
}

export default Map