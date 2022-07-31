import { useEffect, useState } from "react";
import statBarBG from "../../assets/images/stat-bar-bg.png";
import useStore from "../../store";
import getFilename from "../../utils/getFilename";
import GameTimer from "./GameTimer";

function GameStat() {
    const [opponentScore, setAddOpponentScore] = useState(0)
    const state = useStore((state) => state)
    const socket = useStore((state) => state.socket)

    useEffect(() => {
        console.log("In Stat")
        if (state.gameMode == "multiplayer") {
            console.log("Show-Score")
            socket.on("show-score", (targetID, item) => {
                setAddOpponentScore(prevState => prevState + 1)
                state.removeTargetItem(state.level, getFilename(item))
                const targetEl = document.getElementById(targetID)

                targetEl.classList.add("bounce-out-top")

                setTimeout(function () {
                    targetEl.style.visibility = "hidden"
                    targetEl.style.opacity = 0
                    state.removeTargetItem(state.level, getFilename(item))
                }, 400);
            })
            // return () => {
            //     socket.remove("show-score")
            // }
        }
    }, [state.gameMode, socket]);


    return (
        <>
            <div className="relative control-btn bg-cover bg-center bg-no-repeat w-32 h-20 flex flex-col items-center justify-center text-center text-white font-bubblegum text-lg">
                <img src={statBarBG} alt="" className="aboslute inset-0 w-full h-full" />
                <div className="absolute ">
                    <p>Your Score:</p>
                    <p>{state.score}</p>
                </div>
            </div>
            {
                state?.gameMode == "multiplayer" ? (
                    <div className="relative control-btn bg-cover bg-center bg-no-repeat w-32 h-24 flex flex-col items-center justify-center text-center text-white font-bubblegum text-lg">
                        <img src={statBarBG} alt="" className="aboslute inset-0 w-full h-full" />
                        <div className="absolute ">
                            <p className="flex flex-wrap px-4 pt-1">Opponent Score:</p>
                            <p>{opponentScore}</p>
                        </div>
                    </div>
                ) : null
            }
            <GameTimer />
            <div className="relative control-btn bg-cover bg-center bg-no-repeat w-32 h-16 flex flex-col items-center justify-center text-center text-white font-bubblegum text-lg">
                <img src={statBarBG} alt="" className="aboslute inset-0 w-full h-full" />
                <div className="absolute ">
                <p>Level:</p>
                <p>{state.level}/{state.maxLevel}</p>
                </div>
            </div>
        </>
    );
}

export default GameStat;