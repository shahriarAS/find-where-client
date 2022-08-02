import { useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import useStore from "../../store";
import globalVariable from "../../utils/globalVariable";

function GameTimer() {
    var time = new Date();
    const state = useStore((state) => state)

    const {
        seconds,
        pause,
        resume,
        start,
        isRunning,
        restart,
    } = useTimer({
        expiryTimestamp: time.setSeconds(time.getSeconds() + (globalVariable?.maxTime)), autoStart: true, onExpire: () => {
            state.incrementIncorrectCount()
            state.resetAnswerStreak()
            state.setIsQuesCorr(false)
            state.setChoiceModal(true)
            state.setUpdateQ(true)
            // setTimeout(function () {
            //     state.incrementIncorrectCount()
            //     state.resetAnswerStreak()
            //     state.setIsQuesCorr(false)
            // }, 500);
        }
    });

    useEffect(() => {
        if (state.updateQ == true) {
            console.log("Should Restart Time")
            var time = new Date();
            restart(time.setSeconds(time.getSeconds() + (globalVariable?.maxTime)), true)
        }
        if (state.gamePause == true || state.gameOver == true || state.gameStart == true || state.choiceModal == true) {
            const toShowTime = (globalVariable.maxTime - seconds)
            state.setTime(toShowTime)
            pause()
        } else if (state.gamePause != true & state.gameOver != true & state.gameStart != true & state.choiceModal != true) {
            resume()
            console.log("Now Resume")
        }

    }, [state.updateQ, state.gamePause, state.gameOver, state.gameBonus, state.gameStart, state.choiceModal]);

    return (
        <div onClick={isRunning ? pause : resume} className="kahoot-timer absolute left-4 top-[50%] w-20 h-20 flex items-center justify-center bg-violet-600 rounded-full text-5xl text-white font-bold z-10">{seconds}</div>
    );
}

export default GameTimer;