import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerBG from "../assets/images/Page/Homepage/17.png";
import multiplayerImg from "../assets/images/Page/Homepage/24.png";
import singleplayerImg from "../assets/images/Page/Homepage/27.png";
import cardBG from "../assets/images/Page/Homepage/69.png";
import useStore from '../store';

function GameHomePage({ gameType }) {
    const state = useStore((state) => state)
    // console.log(gameType)

    useEffect(() => {
        state.resetState({
            score: 0,
            answerStreak: 0,
            opponentScore: 0,
            opponentCorrect: 0,
            opponentIncorrect: 0,
            opponentHighScore: 0,
            time: "init",
            gameOver: "init",
            gamePause: "init",
            gameStart: "init",
            gameWon: false,
            answer: "",
            lastAnswer: "",
            selectedChoice: null,
            questionSet: [],
            questionNumber: 0,
            choices: [],
            targetCity: [],
            correctCount: 0,
            incorrectCount: 0,
            updateQ: "init",
            choiceModal: false,
            isQuesCorr: "init"
        })
        state.setPlayBy(gameType)
    }, []);
    return (
        <>
            <div className='w-full h-full flex flex-col items-center font-Saira'>
                <div className="home-banner w-full h-[350px] bg-cover bg-center" style={{ backgroundImage: `url(${bannerBG})` }}>
                    <div className="banner-inner w-full h-full flex flex-col items-center justify-center text-white bg-gradient-to-b from-[#a31cf1]/70 to-[#cf7bff]/40">
                        <h1 className="banner-title text-9xl drop-shadow-2xl">Find Where I Am</h1>
                        <p className="banner-tagline text-4xl drop-shadow-2xl">
                            {
                                gameType == "country" ? "Play By Country" : gameType == "state" ? "Play By US State" : null
                            }
                        </p>
                        {/* <img src={binoImg} alt="Find Where I Am" className='w-32' /> */}
                    </div>
                </div>
                <div className="home-cards h-full w-full p-8 bg-cover bg-center grid grid-cols-2 gap-12 justify-center items-center bg-blend-lighten bg-white/40" style={{ backgroundImage: `url(${cardBG})` }}>
                    <Link to="/singleplay">
                        <div className="game-card h-72 border-4 border-[#FF8500] rounded-md bg-cover flex items-end justify-center" style={{ backgroundImage: `url(${singleplayerImg})` }}>
                            <h1 className="card-title w-full bg-[#FF8500] text-white px-4 py-1 text-4xl font-bold text-center">
                                Singleplayer
                            </h1>
                        </div>
                    </Link>
                    <Link to="/multiplayer">
                        <div className="game-card h-72 border-4 border-[#D10203] rounded-md bg-cover flex items-end justify-center" style={{ backgroundImage: `url(${multiplayerImg})` }}>
                            <h1 className="card-title w-full bg-[#D10203] text-white px-4 py-1 text-4xl font-bold text-center">
                                Multiplayer
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
            {/* <ChoiceModal /> */}
        </>
    );
}

export default GameHomePage;