import axios from "axios";
import { useEffect, useState } from "react";
import { countries, usState } from "../assets/data/data";
import gameScreenBG from "../assets/images/gameScreenBG.png";
import GameMap from "../components/game/GameMap";
import GameOverModal from "../components/game/GameOverModal";
import GameQuestionPanel from "../components/game/GameQuestionPanel";
import GameScreenOverlay from "../components/game/GameScreenOverlay";
import GameStat from "../components/game/GameStat";
import GameTimer from "../components/game/GameTimer";
import Loading from "../components/root/Loading";
import useStore from "../store";
import uniqueRandomNumList from "../utils/uniqueRandomNumList";

function GameScreen() {
    const state = useStore((state) => state);
    const [loading, setLoading] = useState(true)
    const API_KEY = import.meta.env.VITE_MAPQUEST_API_KEY
    let questionSet = Array()
    const nameKey = state.playBy.toLowerCase() == "country" ? "ADMIN" : "name"
    const locationData = state.playBy.toLowerCase() == "country" ? countries : state.playBy.toLowerCase() == "state" ? usState : countries

    const generateQuestion = async () => {

        let randomNumList = uniqueRandomNumList(locationData.features.length - 4, (locationData.features.length > 40 ? 40 : locationData.features.length > 20 ? 20 : 8))

        for (let i = 0; i < (randomNumList.length / 4);) {
            let currentSet = []
            for (let j = 0; j < 4; j++) {
                if (j == 0) {

                    const response = await axios.get(`https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${locationData.features[randomNumList[j]].properties[nameKey]}`)

                    const lat_lng = response?.data?.results[0]?.locations[0]?.latLng

                    currentSet.push(
                        { name: locationData.features[randomNumList[j]].properties[nameKey], status: "correct", latLang: [lat_lng?.lat, lat_lng?.lng] }
                    )
                } else {
                    currentSet.push(
                        { name: locationData.features[randomNumList[j]].properties[nameKey], status: "incorrect", latLang: [0, 0] }
                    )
                }
            }
            questionSet.push(currentSet)
            randomNumList = randomNumList.slice(4)
        }
        state.setQuestionSet(questionSet)
        setLoading(false)
    }


    const submitGameSetting = () => {
        setLoading(true)
        generateQuestion()
    }

    useEffect(() => {
        submitGameSetting()
    }, []);



    return (
        loading ? (<Loading msg={"Creating Your Question..."} />) :
            <div div className={`gameScreen overflow-hidden relative w-full h-screen m-auto flex flex-col font-Saira ${state.choiceModal ? "pointer-events-none" : ""}`}>
                <img src={gameScreenBG} alt="Game Screen BG" className="absolute w-full h-screen -z-50" />
                <div className="gameArea w-full h-[70vh] relative">
                    <GameMap />
                    <GameScreenOverlay />
                    <GameTimer />
                </div>
                <GameStat />
                <GameQuestionPanel nameKey={nameKey} />
                <GameOverModal />
            </div >
    );
}

export default GameScreen;