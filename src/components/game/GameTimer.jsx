import { useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';
import wrongSound from "../../assets/audio/wrong.mp3";
import useStore from "../../store";
import globalVariable from "../../utils/globalVariable";

function GameTimer() {
    var time = new Date();
    const state = useStore((state) => state)
    const socket = useStore((state) => state.socket)
    const [playWrongSound] = useSound(wrongSound);

    const {
        seconds,
        pause,
        resume,
        start,
        isRunning,
        restart,
    } = useTimer({
        expiryTimestamp: time.setSeconds(time.getSeconds() + (globalVariable?.maxTime)), autoStart: true, onExpire: () => {
            state.isSound ? playWrongSound() : null
            state.incrementIncorrectCount()
            state.resetAnswerStreak()
            state.setIsQuesCorr(false)
            state.setChoiceModal(true)
            setTimeout(function () {
                state.setUpdateQ(true)
            }, 500)
            // setTimeout(function () {
            //     state.incrementIncorrectCount()
            //     state.resetAnswerStreak()
            //     state.setIsQuesCorr(false)
            // }, 500);
        }
    });

    useEffect(() => {
        if (state.updateQ == true) {
            // console.log("Should Restart Time")
            var time = new Date();
            restart(time.setSeconds(time.getSeconds() + (globalVariable?.maxTime)), true)
        }

        if (state.gamePause == true || state.gameOver == true || state.gameStart == true || state.choiceModal == true) {
            const toShowTime = (globalVariable.maxTime - seconds)
            state.setTime(toShowTime)
            pause()

            if (state.gameOver == true && state.gameMode == "multiplayer") {
                // console.log("Emit Game Over")
                socket.emit("game-over", state.gameCode)
            }

        } else if (state.gamePause != true && state.gameOver != true && state.gameStart != true && state.choiceModal != true) {
            resume()
            // console.log("Now Resume")
        }

    }, [state.updateQ, state.gamePause, state.gameOver, state.gameStart, state.choiceModal]);

    return (
        <div onClick={isRunning ? pause : resume} className="kahoot-timer absolute left-4 top-[50%] w-20 h-20 flex items-center justify-center bg-violet-600 rounded-full text-5xl text-white font-bold z-10">{seconds}</div>
    );
}

export default GameTimer;