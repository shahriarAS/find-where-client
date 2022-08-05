import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import CountUp from 'react-countup';
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import gameOverSound from "../../assets/audio/game-win.mp3";
import "../../assets/css/ribbon.css";
import trophyGoldImg from "../../assets/images/trophy-gold.png";
import trophySilverImg from "../../assets/images/trophy-silver.png";
import useStore from '../../store';
import globalVariable from "../../utils/globalVariable";

function MultiPlayerGameOver() {
    const state = useStore((state) => state)
    const [playGameOverSound] = useSound(gameOverSound)
    const [runConfetti, setRunConfetti] = useState(false)
    const [matchWon, setMatchWon] = useState(false)

    useEffect(() => {
        (state.gameOver == true & state.isSound) ? playGameOverSound() : null

        if (state.score >= state.opponentScore) {
            setMatchWon(true)
        } else {
            setMatchWon(false)
        }

        if (state.gameOver == true) {
            setTimeout(() => {
                setRunConfetti(true)
            }, 4400);
        }
    }, [state.score, state.opponentScore, state.gameOver]);

    return (
        <div className={`absolute z-50 transition-all duration-500 ${(state.gameOver == true && state.gameMode == "multiplayer") ? "top-0" : "-top-[100%]"} w-full h-full py-8 bg-gradient-to-r from-[#355C7D] to-[#C06C84] flex items-center justify-around font-Saira`}>
            {
                (matchWon && runConfetti) ? (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={300}
                    />
                ) : null
            }
            <div className="relative w-96 h-5/6 bg-gradient-to-r from-[#667db6] to-[#C06C84] rounded-lg shadow-2xl text-white p-4 py-4 flex flex-col items-center justify-center">
                <div class="ribbon ribbon-top-left"><span>You</span></div>
                {
                    matchWon ? (
                        <img src={trophyGoldImg} alt="Victory Trophy" className='w-40 puff-in-center' />) : (
                        <img src={trophySilverImg} alt="Victory Trophy" className='w-40 puff-in-center' />
                    )
                }
                <div className="correct-incorrect flex items-center justify-between gap-8 my-8">
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(61,255,39,0.49)] flex gap-6 items-center text-2xl roll-in-left">
                        <FaCheck />
                        <p>{state.correctCount}</p>
                    </div>
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(255,0,0,0.49)] flex gap-6 items-center text-2xl roll-in-right">
                        <FaTimes />
                        {globalVariable.maxQuestion - state.correctCount}
                    </div>
                </div>
                <div className="score-card my-4 text-3xl text-center slide-in-bottom">
                    <p>Your Score: <CountUp start={0} duration={2} delay={1.4} end={state.score} /></p>
                    <p className="text-2xl">High Score: <CountUp start={0} duration={2} delay={1.4} end={state.highScore} /></p>
                </div>
            </div>
            <div className="h-5/6 py-16 flex flex-col items-center justify-between text-white">
                {
                    matchWon ? (
                        <div className="text-center puff-in-center">
                            <h1 className="gameOver-tagline text-base uppercase">Congratulations!!</h1>
                            <h1 className="gameOver-title text-6xl uppercase my-1">Victory</h1>
                        </div>
                    ) : (

                        <div className="text-center puff-in-center">
                            <h1 className="gameOver-tagline text-base uppercase">Try Again!!</h1>
                            <h1 className="gameOver-title text-4xl uppercase">
                                Don't Give Up
                            </h1>
                        </div>
                    )
                }
                <h1 className="gameOver-title text-4xl uppercase my-1">Game Over</h1>
                <div className="btn mt-8">
                    <Link to="/" className='px-8 py-1 transition-all bg-gradient-to-r from-[#355C7D] hover:from-[#355b7dd2] to-[#C06C84] rounded text-2xl shadow-xl'>Return Home</Link>
                </div>
            </div>
            <div className="relative w-96 h-5/6 bg-gradient-to-r from-[#667db6] to-[#C06C84] rounded-lg shadow-2xl text-white p-4 py-4 flex flex-col items-center justify-center">
                <div class="ribbon ribbon-top-left"><span>Opponent</span></div>
                {
                    (state.score == state.opponentScore || state.score < state.opponentScore) ? (
                        <img src={trophyGoldImg} alt="Victory Trophy" className='w-40 puff-in-center' />)
                        : (
                            <img src={trophySilverImg} alt="Victory Trophy" className='w-40 puff-in-center' />
                        )
                }
                <div className="correct-incorrect flex items-center justify-between gap-8 my-8">
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(61,255,39,0.49)] flex gap-6 items-center text-2xl roll-in-left">
                        <FaCheck />
                        <p>{state.opponentCorrect}</p>
                    </div>
                    <div className="correct p-1 px-4 rounded-full bg-[rgba(255,0,0,0.49)] flex gap-6 items-center text-2xl roll-in-right">
                        <FaTimes />
                        {globalVariable?.maxQuestion - state.opponentCorrect}
                    </div>
                </div>
                <div className="score-card my-4 text-3xl text-center slide-in-bottom">
                    <p>Opponent's Score: <CountUp start={0} duration={2} delay={1.4} end={state.opponentScore} /></p>
                    <p className="text-2xl">Opponent's High Score: <CountUp start={0} duration={2} delay={1.4} end={state.opponentHighScore} /></p>
                </div>
            </div>
        </div>
    );
}

export default MultiPlayerGameOver;