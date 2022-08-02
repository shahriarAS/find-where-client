import { useEffect, useState } from "react";
import useStore from "../../store";
import globalVariable from "../../utils/globalVariable";

function ChoiceModal() {
    const state = useStore((state) => state);
    const socket = useStore((state) => state.socket)
    const [toAddScore, setToAddScore] = useState(0)

    useEffect(() => {
        if (state.time > 0 & state.isQuesCorr) {
            // Scoring Formula From Kahoots
            const score = (1 - ((state.time / globalVariable.maxTime) / 2)) * 1000
            state.addScore(score)
            setToAddScore(score)

            if (state.gameMode == "multiplayer") {
                console.log("Socket Emit Add: ")
                socket.emit("add-score", state.gameCode, score)
            }
        }
    }, [state.time]);


    return (
        <div className={`choiceModal absolute z-50 transition-all duration-500 ${state.choiceModal ? "top-0" : "-top-[100%]"} ${state.isQuesCorr ? "bg-green-400" : "bg-[#FF3355]"} w-full py-4 text-white font-Saira flex flex-col items-center justify-center`}>
            {
                state.isQuesCorr ? (
                    <>
                        <div className="bg-black/20 px-4 py-1 w-80 text-3xl text-center font-bold">
                            {
                                state.answerStreak > 0 ? (
                                    <p className='text-white text-2xl'>
                                        Answer Streak {state.answerStreak}
                                    </p>
                                ) : (
                                    <p className='text-white text-2xl'>
                                        Correct
                                    </p>
                                )
                            }
                            <p>+ {toAddScore}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-black/20 px-4 py-1 w-80 text-3xl text-center font-bold">
                            <p className='text-white text-2xl'>
                                {state.selectedChoice ? "Incorrect" : "Time Up"}
                            </p>
                            <p className='text-white text-xl'>
                                Answer Streak Lost
                            </p>
                        </div>
                    </>
                )
            }

        </div >
    );
}

export default ChoiceModal;