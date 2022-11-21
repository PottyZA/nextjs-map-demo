## Getting Started
Run the development server using docker:
```bash
docker compose docker-compose.dev.yml up --build
```

You may also run the application in production mode using the following snippet:
```bash
docker compose docker-compose.prod.yml up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key packages and libaries used
- [Next.js](https://nextjs.org/docs) - Next.js is a web development framework based on React.
- [Leaflet](https://leafletjs.com/) - a JavaScript mapping library.
- [React-Leaftlet](https://react-leaflet.js.org/) - React components for Leaflet Maps
- [Leaflet-Geoman](https://github.com/geoman-io/leaflet-geoman) - Advanced editing capabilities for Leaflet maps (incl. MultiPolygon support)

## Screenshots
![Main Screen](/readme-resources/main_screen.png)
The main screen of the application, prior to importing anything

![Imported Cape Town GeoJSON](/readme-resources/imported_ct.png)
The app after importing a sample GeoJSON file containing a polygon of Cape Town

![Imported sample GeoJSON](/readme-resources/imported_sample.png)
The app after importing a sample GeoJSON file containing more complex data
