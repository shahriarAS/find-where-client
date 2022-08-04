import Confetti from "react-confetti";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import trophyGoldImg from "../../assets/images/trophy-gold.png";
import useStore from '../../store';
import globalVariable from "../../utils/globalVariable";

function MultiPlayerGameOver() {
    const state = useStore((state) => state)

    return (
        <div className={`absolute z-50 transition-all duration-500 ${state.gameOver == true ? "top-0" : "-top-[100%]"} w-full h-full py-8 bg-gradient-to-r from-[#355C7D] to-[#C06C84] flex items-center justify-around font-Saira`}>
            {
                state.gameMode == "multiplayer" && state.score >= state.opponentScore ? (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={300}
                    />
                ) : null
            }
            <div className="w-96 h-5/6 bg-gradient-to-r from-[#667db6] to-[#C06C84] rounded-lg shadow-2xl text-white p-4 py-4 flex flex-col items-center justify-center">
                <img src={trophyGoldImg} alt="Victory Trophy" className='w-40' />
                <div className="correct-incorrect flex items-center justify-between gap-8 my-8">
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(61,255,39,0.49)] flex gap-6 items-center text-2xl">
                        <FaCheck />
                        <p>{state.correctCount}</p>
                    </div>
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(255,0,0,0.49)] flex gap-6 items-center text-2xl">
                        <FaTimes />
                        {state.incorrectCount}
                    </div>
                </div>
                <div className="score-card my-4 text-3xl text-center">
                    <p>Your Score: {state.score}</p>
                    <p className="text-2xl">High Score: {state.highScore}</p>
                </div>
            </div>
            <div className="h-5/6 py-16 flex flex-col items-center justify-between text-white">
                <div className="text-center">
                    <h1 className="gameOver-tagline text-base uppercase">Congratulations!!</h1>
                    <h1 className="gameOver-title text-6xl uppercase my-1">Victory</h1>
                </div>
                <h1 className="gameOver-title text-4xl uppercase my-1">Game Over</h1>
                <div className="btn mt-8">
                    <Link to="/" className='px-8 py-1 transition-all bg-gradient-to-r from-[#355C7D] hover:from-[#355b7dd2] to-[#C06C84] rounded text-2xl shadow-xl'>Return Home</Link>
                </div>
            </div>
            <div className="w-96 h-5/6 bg-gradient-to-r from-[#667db6] to-[#C06C84] rounded-lg shadow-2xl text-white p-4 py-4 flex flex-col items-center justify-center">
                <img src={trophyGoldImg} alt="Victory Trophy" className='w-40' />
                <div className="correct-incorrect flex items-center justify-between gap-8 my-8">
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(61,255,39,0.49)] flex gap-6 items-center text-2xl">
                        <FaCheck />
                        <p>{state.opponentCorrect}</p>
                    </div>
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(255,0,0,0.49)] flex gap-6 items-center text-2xl">
                        <FaTimes />
                        {globalVariable.maxQuestion - state.opponentIncorrect}
                    </div>
                </div>
                <div className="score-card my-4 text-3xl text-center">
                    <p>Opponent's Score: {state.opponentScore}</p>
                    <p className="text-2xl">Opponent's High Score: {state.opponentHighScore}</p>
                </div>
            </div>
        </div>
    );
}

export default MultiPlayerGameOver;