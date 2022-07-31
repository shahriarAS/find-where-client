import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import statBarBG from "../../assets/images/stat-bar-bg.png";
import useStore from "../../store";
import globalVariable from '../../utils/globalVariable';

const GameTimer = () => {
    var time = new Date();
    const state = useStore((state) => state)
    const socket = useStore((state) => state.socket)

    const {
        seconds,
        minutes,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: time.setSeconds(time.getSeconds() + globalVariable?.maxTime), autoStart: true, onExpire: () => state.setGameOver(true) });

    const reduceTimeFunc = () => {
        // Reduce Time Problem Fixed. Warning! Don't touch without prior knowledge
        restart(time.setSeconds(time.getSeconds() - (((((globalVariable?.maxTime / 60) - 1) - minutes) * 60) + (60 - seconds) + 10)))
    }

    useEffect(() => {
        if (state.gamePause == true || state.gameOver == true || state.gameBonus == true || state.gameStart == true) {
            // Remain Time = Total Time - Passed Time
            const toShowTime = ((((globalVariable?.maxTime / 60) - 1) - minutes) * 60) + (60 - seconds)
            state.setTime(toShowTime)
            pause()
            if (state.gameMode == "multiplayer") {
                console.log("Emit Game Over")
                socket.emit("game-over", state.gameCode, `${toShowTime}`)
            }
            console.log("Now Pause")
        } else if (state.gamePause != true & state.gameOver != true & state.gameBonus != true & state.gameStart != true) {
            resume()
            console.log("Now Resume")
        }
        // Reduce Time Problem Fixed. Warning! Don't touch without prior knowledge
        state.reduceTime != 0 ? reduceTimeFunc() : null
    }, [state.gamePause, state.gameOver, state.gameBonus, state.gameStart, state.reduceTime]);

    return (
        <>
            <div className="relative control-btn bg-cover bg-center bg-no-repeat w-32 h-20 flex flex-col items-center justify-center text-center text-white font-bubblegum text-lg">
                <img src={statBarBG} alt="" className="aboslute inset-0 w-full h-full" />
                <div className="absolute ">
                    <p>Time:</p>
                    <p>{minutes}:{seconds}</p>
                </div>
            </div>
        </>
    );
};

export default GameTimer