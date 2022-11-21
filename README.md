## Description
This demo application uses Next.js with TypeScript to implement GeoJSON file handling and viewing in React. Leaflet is used to render the map and handling polygon drawing logic. 

## Main Features
The application has the following main features:
- Import and view existing GeoJSON files
- Edit GeoJSON based polygon layers on the map
- Create new geospatial objects on the map
- Export edited imported GeoJSON layers, along with any newly created objects

## Getting Started
Run the development server using docker:
```bash
docker compose -f docker-compose.dev.yml up --build
```

You may also run the application in production mode using the following snippet:
```bash
docker compose -f docker-compose.prod.yml up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Sample GeoJSON files have been provided in the `/samples` directory.

## Key packages and libaries used
- [Next.js](https://nextjs.org/docs) - Next.js is a web development framework based on React. Here it's configured to use TypeScript.
- [Leaflet](https://leafletjs.com/) - a JavaScript mapping library.
- [React-Leaftlet](https://react-leaflet.js.org/) - React components for Leaflet Maps
- [Leaflet-Geoman](https://github.com/geoman-io/leaflet-geoman) - Advanced editing capabilities for Leaflet maps (incl. MultiPolygon support)
- [Material UI](https://mui.com/) - Material design based UI components for fast iteration.
- [Docker](https://www.docker.com/) - Containerisation of the application

## Known Issues
- The application performs poorly when enabling editing on more complex GeoJSON data layers. This could be improved by editing layer creation to generate a new layer per polygon within a GeoJSON file, as opposed to one layer per GeoJSON import.
- The Leaflet-Geoman package doesn't include easily accessible TypeScript types, so the `Map.tsx` file includes a `// @ts-nocheck` to work around that limitation.

## Screenshots
![Main Screen](/readme-resources/main_screen.png)
The main screen of the application, prior to importing anything

![Imported Cape Town GeoJSON](/readme-resources/imported_ct.png)
The app after importing a sample GeoJSON file containing a polygon of Cape Town

![Imported sample GeoJSON](/readme-resources/imported_sample.png)
The app after importing a sample GeoJSON file containing more complex data
