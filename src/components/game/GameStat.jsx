import { useEffect } from "react";
import { BiCoinStack } from "react-icons/bi";
// import { BsClockHistory } from "react-icons/bs";
import checkImg from "../../assets/images/check.png";
import crossImg from "../../assets/images/remove.png";
import useStore from "../../store";

function GameStat() {
    const state = useStore((state) => state);
    const socket = useStore((state) => state.socket)

    useEffect(() => {
        if (state.gameMode == "multiplayer") {
            // console.log("Show-Score")
            socket.on("show-score", (score, opponentCorrect, opponentHighScore) => {
                // console.log(score, opponentCorrect, opponentHighScore)
                state.addOpponentScore(score)
                state.addOpponentCorrect(opponentCorrect)
                state.addOpponentHighScore(opponentHighScore)
            })
        }
    }, [state.gameMode, socket]);

    return (
        <div className="stats w-full h-[9vh] bg-gradient-to-r from-[#363636] to-[#161616] relative flex justify-between items-center text-white px-2">
            {
                state.gameMode == "multiplayer" ? (
                    <div className="score text-4xl flex items-center justify-between gap-2">
                        <p className="score-value">{state.opponentScore}</p>
                        <BiCoinStack />
                    </div>
                ) : null
            }
            <div className="question-stats text-4xl flex items-center justify-center gap-16 w-full px-8">
                <div className="correct-q flex items-center gap-2">
                    <p className="correct-value">{state.correctCount}</p>
                    <img src={checkImg} alt="Correct" className="w-8" />
                </div>
                <div className="q-left flex items-center justify-between gap-4 text-2xl">
                    <p className="current-q">{state.questionNumber + 1}</p>
                    <div className="q-progress">
                        <div className="w-56 bg-gray-200 h-2.5">
                            <div className="bg-blue-600 h-2.5" style={{ "width": `${(100 / state.questionSet.length) * (state.questionNumber + 1)}%` }}></div>
                        </div>

                    </div>
                    <p className="last-q">{state.questionSet.length}</p>
                </div>
                <div className="wrong-q flex items-center gap-2">
                    <img src={crossImg} alt="Wrong" className="w-8" />
                    <p className="wrong-value">{state.incorrectCount}</p>
                </div>
            </div>
            <div className="score text-4xl flex items-center justify-between gap-2">
                <p className="score-value">{state.score}</p>
                <BiCoinStack />
            </div>
        </div>
    );
}

export default GameStat;