import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import trophyImg from "../../assets/images/trophy.png";
import useStore from '../../store';

function SinglePlayerGameOver() {
    const state = useStore((state) => state)

    return (
        <>
            <div className="w-96 h-full bg-gradient-to-r from-[#667db6] to-[#C06C84] rounded-lg shadow-2xl text-white p-4 py-4 flex flex-col items-center">

                <h1 className="gameOver-tagline text-base uppercase">Congratulations!!</h1>
                <h1 className="gameOver-title text-6xl uppercase my-1">Victory</h1>
                <img src={trophyImg} alt="Victory Trophy" className='w-40' />
                <div className="correct-incorrect flex items-center justify-between gap-8">
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(61,255,39,0.49)] flex gap-6 items-center text-2xl">
                        <FaCheck />
                        <p>{state.correctCount}</p>
                    </div>
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(255,0,0,0.49)] flex gap-6 items-center text-2xl">
                        <FaTimes />
                        {state.incorrectCount}
                    </div>
                </div>
                <div className="score-card my-4 mt-8 text-3xl text-center">
                    <p>Your Score: {state.score}</p>
                    <p className="text-2xl">High Score: {state.highScore}</p>
                </div>
                <div className="btn mt-8">
                    <Link to="/" className='px-8 py-1 transition-all bg-gradient-to-r from-[#355C7D] hover:from-[#355b7dd2] to-[#C06C84] rounded text-2xl shadow-xl'>Return Home</Link>

                </div>
            </div>

        </>
    );
}

export default SinglePlayerGameOver;