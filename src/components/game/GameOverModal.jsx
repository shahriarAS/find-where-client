import { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store";

function GameOverModal() {
    const state = useStore((state) => state)

    const updateDB = () => {
        const data = {
            score: state.score,
            correct: state.correctCount,
            Incorrect: state.incorrectCount
        }
        console.log(data)
    }

    useEffect(() => {
        state.gameOver && updateDB
    }, [state.gameOver]);

    return (
        <div className={`choiceModal absolute z-50 transition-all duration-500 ${state.gameOver == true ? "top-0" : "-top-[100%]"} bg-green-400 w-full h-full py-4 text-white font-Saira flex flex-col items-center justify-center`}>
            <div className="bg-black/20 px-4 py-1 w-80 text-3xl text-center font-bold">
                <h1 className="text-2xl text-white">Game Over</h1>
            </div>
            <p className="text-xl">Score: {state.score}</p>
            <p className="text-xl">Correct: {state.correctCount}</p>
            <p className="text-xl">Incorrcet: {state.incorrectCount}</p>
            <div className="border-2 w-32 h-8 bg-red-500" style={{ clipPath: "polygon(0 1%, 76% 0, 100% 100%, 0% 100%)" }}></div>
            <Link to="/">Home</Link>
        </div >
    );
}

export default GameOverModal;