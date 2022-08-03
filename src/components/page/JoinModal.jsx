import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { countries, usState } from "../../assets/data/data";
import Loading from "../../components/root/Loading";
import useStore from "../../store";
import uniqueRandomNumList from "../../utils/uniqueRandomNumList";

function JoinModal({ openJoinModal, setOpenJoinModal, setStartGame, gameCodeQuery, gameName }) {
    const state = useStore((state) => state)
    const [gameCode, setGameCode] = useState(gameCodeQuery ? gameCodeQuery : "")
    const socket = useStore((state) => state.socket)
    const [joinMsg, setJoinMsg] = useState()
    const [loading, setLoading] = useState(false)
    const API_KEY = import.meta.env.VITE_MAPQUEST_API_KEY
    let questionSet = Array()

    const closeModalOnShadowClick = (e) => {
        if (e.target.id == "overlay") {
            setOpenJoinModal(false)
        }
    }

    const joinGameClick = () => {
        if (gameCode.trim().length > 0) {
            state.setGameCode(gameCode)
            gameName && state.setPlayBy(gameName)
            console.log(gameName)
            console.log("Joining Game")
            socket.emit("join-game", gameCode, state.username, state.questionSet, joinResponse => {
                joinResponse && toast.error(joinResponse)
            })
            console.log(state.questionSet)
        } else {
            toast.error("Empty Game Code. Please provide valid code.", {
                duration: 800
            })
        }
    }

    socket.on("other-joined", (msg) => {
        setJoinMsg(msg)
        setStartGame(true)
        state.setGameMode("multiplayer")
    })

    const generateQuestion = async () => {
        const nameKey = state.playBy.toLowerCase() == "country" ? "ADMIN" : "name"
        const locationData = state.playBy.toLowerCase() == "country" ? countries : state.playBy.toLowerCase() == "state" ? usState : countries

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
        console.log("In SUbmit")
        setLoading(true)
        generateQuestion()
    }

    useEffect(() => {
        if (openJoinModal == true && state.playBy) {
            submitGameSetting()
        }

        // state.playBy ? submitGameSetting() : null
    }, [state.gameMode, openJoinModal, state.playBy]);

    return (
        loading ? (<Loading msg={"Creating Your Question..."} />) :
            <div id="overlay" className={`fixed transition-all duration-700 w-full h-screen inset-0 ${openJoinModal ? "inset-0" : "-left-[100%]"} bg-gray-800/50 flex items-center justify-center`} onClick={(e) => closeModalOnShadowClick(e)}>
                <div className="relative join-game rounded-lg w-96 h-56 flex items-center justify-center text-[#424242] text-5xl bg-gradient-to-r from-[#84fab0] to-[#8fd3f4]">
                    <div className="absolute right-4 top-1 w-6 cursor-pointer" onClick={() => setOpenJoinModal(false)}>
                        <GrClose className="w-full" />
                    </div>

                    <div className="w-full flex flex-col items-center justify-center text-xl">
                        <div className="register-div flex items-center justify-center rounded border border-[#424242]">
                            {/* <p className="register-input bg-transparent-label text-md ml-2">
                            Game ID :
                        </p> */}
                            <input value={gameCode} onChange={(e) => setGameCode(e.target.value)} className="register-input w-64 bg-transparent text-md p-1 px-2 text-center" />
                            {/* <p className="register-input bg-transparent-label text-md p-1 px-2 cursor-default bg-[#424242] text-white" onClick={pasteGameCodeOnClick}>
                            Paste
                        </p> */}
                        </div>
                        {
                            joinMsg ? <p className="register-text mt-4 px-12 py-2 text-lg rounded-3xl drop-shadow-2xl">{joinMsg}</p> : (
                                <button onClick={joinGameClick} className="register-btn mt-4 px-12 py-2 bg-[#A900FD] text-white text-2xl rounded-3xl drop-shadow-2xl">
                                    Join
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
    );
}

export default JoinModal;