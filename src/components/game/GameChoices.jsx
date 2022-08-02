import { useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import useStore from "../../store";

function GameChoices({ choices, checkAnswer }) {
    const ansRef = useRef("")
    const state = useStore((state) => state);
    const [checkClass, setCheckClass] = useState("")

    const submitAnswer = (e, ans) => {
        state.setLastAnswer(state.answer)
        e.target.classList.add("blink-1")

        if (state.answer == ans) {
            e.target.classList.remove("bg-gradient-to-r")
            e.target.classList.add("bg-green-600")
            e.target.childNodes[1].classList.remove("hidden")
        } else {
            e.target.classList.remove("bg-gradient-to-r")
            e.target.classList.add("bg-red-700")
            e.target.childNodes[2].classList.remove("hidden")
        }

        setTimeout(function () {
            if (state.answer == ans) {
                state.incrementCorrectCount()
                state.addScore()
                state.addContinousScore(1)
                state.setIsQuesCorr(true)
            } else {
                state.incrementIncorrectCount()
                state.resetContinousScore()
                state.setIsQuesCorr(false)
            }

            state.setChoiceModal(true)
            if (state.questionNumber == 9) {
                alert("Game Over")
            } else {
                state.setUpdateQ(true)
            }
        }, 1000);
    }

    return (
        <div className="q-choices flex-2 grid grid-cols-2 text-lg gap-4 mr-8">
            {
                choices.map((choice, index) => (
                    <div key={choice.name} onClick={(e) => submitAnswer(e, choice.name)} className="choice bg-gradient-to-r from-[#DA230D] to-[#D57F2A] w-72 rounded py-2 text-center px-4 flex justify-between items-center">
                        <div className="flex items-center justify-start gap-2 pointer-events-none">
                            <span>{index == 0 ? "A" : index == 1 ? "B" : index == 2 ? "C" : "D"}.</span>
                            <span>{choice.name}</span>
                        </div>
                        <div className="hidden">
                            <BsCheckLg />
                        </div>
                        <div className="hidden">
                            <FaTimes />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default GameChoices;