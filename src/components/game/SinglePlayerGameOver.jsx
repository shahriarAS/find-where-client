import { useEffect } from "react";
import CountUp from 'react-countup';
import { FaCheck, FaTimes } from "react-icons/fa";
// import Confetti from "react-confetti";
import { Link } from 'react-router-dom';
import trophyGoldImg from "../../assets/images/trophy-gold.png";
import trophySilverImg from "../../assets/images/trophy-silver.png";
import useStore from '../../store';

function SinglePlayerGameOver() {
    const state = useStore((state) => state)

    useEffect(() => {

    }, []);

    return (
        <div className={`absolute z-50 transition-all duration-500 ${state.gameOver == true ? "top-0" : "-top-[100%]"} w-full h-full py-8 bg-gradient-to-r ${state.scoreCount > state.incorrectCount ? "from-[#667db6] to-[#C06C84]" : "from-[#8e9eab] to-[#9bcedb]"} flex items-center justify-around font-Saira`}>
            {
                state.gameOver == true ? (
                    <>
                        {state.gameMode == "singplePlayer" && state.correctCount > state.incorrectCount ? (
                            <Confetti
                                width={window.innerWidth}
                                height={window.innerHeight}
                                numberOfPieces={300}
                            />
                        ) : null
                        }
                        <div className={`w-96 h-full bg-gradient-to-r ${state.scoreCount > state.incorrectCount ? "from-[#667db6] to-[#C06C84]" : "from-[#8e9eab] to-[#9bcedb]"} rounded-lg shadow-2xl text-white p-4 py-4 flex flex-col items-center backdrop-blur-lg`}>

                            {state.scoreCount > state.incorrectCount ? (
                                <>
                                    <h1 className="gameOver-tagline slide-in-top text-base uppercase">Congratulations!!</h1>
                                    <h1 className="gameOver-title slide-in-top text-6xl uppercase my-1">
                                        Victory
                                    </h1>
                                    <img src={trophyGoldImg} alt="Victory Trophy" className='w-40 puff-in-center' />
                                </>
                            ) : (
                                <>
                                    <h1 className="gameOver-tagline text-base uppercase slide-in-top">Try Again!!</h1>
                                    <h1 className="gameOver-title text-4xl uppercase my-1 slide-in-top">
                                        Don't Give Up
                                    </h1>
                                    <img src={trophySilverImg} alt="Silver Trophy" className='w-40 puff-in-center' />
                                </>
                            )
                            }
                            <div className="correct-incorrect flex items-center justify-between gap-8">
                                <div className="correct p-1 px-4 rounded-full bg-[rgba(61,255,39,0.4)] flex gap-6 items-center text-2xl my-4 roll-in-left">
                                    <FaCheck />
                                    <p>{state.correctCount}</p>
                                </div>
                                <div className="correct p-1 px-4 rounded-full bg-[rgba(255,0,0,0.4)] flex gap-6 items-center text-2xl roll-in-right">
                                    <FaTimes />
                                    {state.incorrectCount}
                                </div>
                            </div>
                            <div className="score-card my-4 text-3xl text-center">
                                <p className="text-focus-in">Your Score: <CountUp start={0} duration={2} delay={4.7} end={state.score} /></p>
                                <p className="text-2xl text-focus-in">High Score: <CountUp start={0} delay={4.7} duration={2} end={state.highScore} /></p>
                            </div>
                            {state.scoreCount > state.incorrectCount ? (
                                <div className="btn mt-8">
                                    <Link to="/" className='px-8 py-1 transition-all duration-200 bg-gradient-to-r from-[#355C7D] to-[#C06C84] rounded text-2xl hover:shadow-2xl slide-in-bottom'>Return Home</Link>
                                </div>
                            ) : (
                                <div className="btn mt-8">
                                    <Link to="/" className='px-8 py-1 transition-all duration-200 bg-gradient-to-r from-[#bbd0d5] to-[#8e9eab] rounded text-2xl hover:shadow-2xl slide-in-bottom'>Return Home</Link>
                                </div>
                            )}
                        </div>
                    </>
                ) : null
            }

        </div >
    );
}

export default SinglePlayerGameOver;