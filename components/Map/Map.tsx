import {useEffect, useState, FC} from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './MapView.module.scss';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const {MapContainer} = ReactLeaflet;

import sampleGeoJson from "../../utils/samples/sample.geojson.txt"

type MapProps = {
  children: JSX.Element
  className: String
}

const Map: FC<MapProps> = ({children, className, geojsonObjects, ...rest}) => {
  const DEFAULT_CENTER = [-33.918861, 18.423300]

  let mapClassName = styles.map;
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  const json = JSON.parse(sampleGeoJson)

//  useEffect(() => {
//    (async function init() {
//      delete L.Icon.Default.prototype._getIconUrl;
//
//      L.Icon.Default.mergeOptions({
//        iconRetinaUrl: iconRetinaUrl.src,
//        iconUrl: iconUrl.src,
//        shadowUrl: shadowUrl.src,
//      });
//    })();
//  }, []);

  const defaultMarkers = [[-33.918861, 18.423300]]
  const [markers, setMarkers] = useState(defaultMarkers)
  return (
    <MapContainer className={mapClassName} center={DEFAULT_CENTER} zoom={12} minZoom={4}>
      <ReactLeaflet.TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        noWrap
      />
      { markers.map((marker) => {
        return (<ReactLeaflet.Marker position={marker}>
          <ReactLeaflet.Popup>
            A pretty CSS3 popup. <br/> Easily customizable.
          </ReactLeaflet.Popup>
        </ReactLeaflet.Marker>)
      })}
      <ReactLeaflet.GeoJSON data={json} />
    </MapContainer>
  )
}

export default Map;