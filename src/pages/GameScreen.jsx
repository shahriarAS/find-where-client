import { BiCoinStack } from "react-icons/bi";
import { BsClockHistory } from "react-icons/bs";
import checkImg from "../assets/images/check.png";
import gameScreenBG from "../assets/images/gameScreenBG.png";
import helpImg from "../assets/images/help.png";
import powerImg from "../assets/images/power.png";
import crossImg from "../assets/images/remove.png";
import scoreBadge from "../assets/images/score-badge.png";
import timeBadge from "../assets/images/time-badge.png";
import zoomInImg from "../assets/images/zoom-in.png";
import zoomOutImg from "../assets/images/zoom-out.png";

function GameScreen() {
    return (
        <div className="gameScreen relative w-full h-screen m-auto flex flex-col font-Saira">
            <img src={gameScreenBG} alt="Game Screen BG" className="absolute w-full h-screen -z-50" />
            <div className="gameArea w-full h-[61vh] relative">
                <div className="power-div absolute inset-0 w-24 cursor-pointer">
                    <img src={powerImg} alt="Power" className="w-full" />
                </div>
                <div className="help-div absolute right-4 top-4 w-12 cursor-pointer">
                    <img src={helpImg} alt="help" className="w-full" />
                </div>
                <div className="zoom-div absolute right-4 bottom-4 w-10 flex flex-col items-center gap-2">
                    <img src={zoomInImg} alt="Zoom In" className="cursor-pointer" />
                    <img src={zoomOutImg} alt="Zoom Out" className="cursor-pointer" />
                </div>
                <div class="kahoot-timer absolute left-4 top-[50%] w-20 h-20 flex items-center justify-center bg-violet-600 rounded-full text-5xl text-white font-bold">10</div>
            </div>
            <div className="gameBadge w-full h-[6vh] relative flex justify-between">
                <img src={timeBadge} alt="Time" />
                <img src={scoreBadge} alt="Score" />
            </div>
            <div className="options w-full h-[9vh] bg-gradient-to-r from-[#363636] to-[#161616] relative flex justify-between items-center text-white px-2">
                <div className="time text-4xl flex items-center justify-between gap-2">
                    <BsClockHistory />
                    <p className="time-value">3:10</p>
                </div>
                <div className="question-stats text-4xl flex items-center justify-center gap-16 w-full px-8">
                    <div className="correct-q flex items-center gap-2">
                        <p className="correct-value">05</p>
                        <img src={checkImg} alt="Correct" className="w-8" />
                    </div>
                    <div className="q-left flex items-center justify-between gap-4 text-2xl">
                        <p className="current-q">06</p>
                        <div className="q-progress">
                            <div class="w-56 bg-gray-200 h-2.5">
                                <div class="bg-blue-600 h-2.5" style={{ width: "45%" }}></div>
                            </div>

                        </div>
                        <p className="last-q">10</p>
                    </div>
                    <div className="wrong-q flex items-center gap-2">
                        <img src={crossImg} alt="Wrong" className="w-8" />
                        <p className="wrong-value">03</p>
                    </div>
                </div>
                <div className="score text-4xl flex items-center justify-between gap-2">
                    <p className="score-value">1200</p>
                    <BiCoinStack />
                </div>
            </div>
            <div className="quiz w-full h-[28vh] flex justify-between items-center uppercase text-white font-bold px-4">
                <div className="question h-full flex-1">
                    <p className="q-title text-3xl mt-8">Question: 06</p>
                    <p className="q-text mt-4 text-2xl w-2/3">What is the mentioned country in the map?</p>
                </div>
                <div className="q-choices flex-2 grid grid-cols-2 text-2xl gap-4 mr-8">
                    <div className="choice bg-gradient-to-r from-[#DA230D] to-[#D57F2A] w-56 rounded py-2 text-center flex items-center justify-start gap-2 pl-4">
                        <span>A.</span>
                        <span>USA</span>
                    </div>
                    <div className="choice bg-gradient-to-r from-[#DA230D] to-[#D57F2A] w-56 rounded py-2 text-center flex items-center justify-start gap-2 pl-4">
                        <span>B.</span>
                        <span>Germany</span>
                    </div>
                    <div className="choice bg-gradient-to-r from-[#DA230D] to-[#D57F2A] w-56 rounded py-2 text-center flex items-center justify-start gap-2 pl-4">
                        <span>C.</span>
                        <span>Chaina</span>
                    </div>
                    <div className="choice bg-gradient-to-r from-[#DA230D] to-[#D57F2A] w-56 rounded py-2 text-center flex items-center justify-start gap-2 pl-4">
                        <span>D.</span>
                        <span>Bangladesh</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameScreen;