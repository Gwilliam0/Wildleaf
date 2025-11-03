import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

// Samuel here: this component is to center the map
// - it is used on the map.jsx rendering
// - it centers the map around the geoJson (based on excluded)

function FitBounds({ geoJson }) {
    const map = useMap();

    useEffect(() => {
        if (!geoJson) return;
        //list of stuff it will ignore
        const excluded = ["Islas Canarias", "Islas Baleares", "Ceuta", "Melilla"];
        const peninsulaFeatures = geoJson.features.filter(
          f => !excluded.includes(f.properties.name)
        );

        const peninsulaGeoJSON = {
          type: "FeatureCollection",
          features: peninsulaFeatures
        };

        const bounds = L.geoJSON(peninsulaGeoJSON).getBounds();
        map.fitBounds(bounds, { padding: [20, 20] });

    }, [map, geoJson]);

    return null;
}

export default FitBounds;
