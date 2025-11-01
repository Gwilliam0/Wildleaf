import './map.css'
import { useState, useEffect } from 'react';
import Map_Result from '../map_result_component/map_result';

// Importing Leaflet
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function Map(props) {

    const [ regions, setRegions ] = useState(null);
    const [ displayResults, setDisplayResults ] = useState(false);

    // fetch the data for the regions
    useEffect(() => {
        fetch('/spain_regions.geojson')
        .then(res => res.json())
        .then(data => setRegions(data));
    }, []);

    // function to handle the click on the regions
    const handleClickRegion = (region, layer) => {
        layer.on({
            click: () => {
                console.log(`You clicked on : ${region.properties.name}`);
                setDisplayResults(true)
            }
        });
    };

    return (
        <>
            <MapContainer center={[40.4168, -3.7038]} zoom={7}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {regions && <GeoJSON data={regions} onEachFeature={handleClickRegion} />}
                {displayResults && <Map_Result/>}
            </MapContainer>
        </>
    )
}

export default Map