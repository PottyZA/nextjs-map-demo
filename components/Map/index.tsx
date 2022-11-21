import dynamic from 'next/dynamic';

// Wrap the map import in a dynamic import so that we can disallow server-side rendering (which breaks Leaflet)
const Map = dynamic(() => import('./Map'), {
  ssr: false
});

export default Map;