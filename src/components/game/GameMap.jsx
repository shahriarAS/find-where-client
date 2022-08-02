import { useEffect, useState } from "react";
import { GeoJSON, MapContainer } from "react-leaflet";
import { countries, usState } from "../../assets/data/data";
import useStore from "../../store";
import Loading from "../root/Loading";

function GameMap() {
    const [loading, setLoading] = useState(false)
    const state = useStore((state) => state);
    const locationData = state.playBy.toLowerCase() == "country" ? countries : state.playBy.toLowerCase() == "state" ? usState : countries
    const targetCity = state.targetCity

    const locationStyle = {
        color: "#1F1F1F",
        weight: 1,
    };

    const onEachlocation = (location, layer) => {
        const locationName = location?.properties?.name || location?.properties?.ADMIN;
        // console.log(locationName)
        // console.log(targetCity)
        if (locationName == targetCity.name) {
            layer.options.fillColor = "#603FC6";
            layer.options.fillOpacity = 1;
        } else {
            layer.bindPopup(locationName);
        }
    };

    useEffect(() => {
        setLoading(true)
        state.setChoices()
        state.setTargetCity()
        console.log(state.targetCity)
        setLoading(false)
    }, [state.answer]);



    return (
        <div className="w-full h-full bg-white overflow-hidden">
            {
                loading ? (<Loading />) :
                    <MapContainer key={targetCity.latLang} style={{ height: "100%", width: "100%" }} zoom={6} maxZoom={12} center={targetCity.latLang} zoomControl={false}>
                        <GeoJSON
                            key={targetCity.latLang}
                            style={locationStyle}
                            data={locationData.features}
                            onEachFeature={onEachlocation}
                        />
                    </MapContainer>
            }
        </div>
    );
}

export default GameMap;