import { useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import useStore from "../../store";

function GameChoices({ choices, checkAnswer }) {
    const choiceRef = useRef("")
    const state = useStore((state) => state);
    const socket = useStore((state) => state.socket)
    const [checkClass, setCheckClass] = useState("")

    const submitAnswer = (e, ans) => {
        state.setLastAnswer(state.answer)
        state.setSelectedChoice(ans)
        // e.target.classList.add("blink-1")
        choiceRef.current.childNodes.forEach(childN => {
            childN.classList.add("opacity-50", "pointer-events-none", "cursor-not-allowed")
        });
        e.target.classList.remove("opacity-50", "pointer-events-none", "cursor-not-allowed")

        const addSign = () => {
            if (state.answer == ans) {
                e.target.classList.remove("bg-gradient-to-r")
                e.target.classList.add("bg-green-600")
                e.target.childNodes[2].classList.add("hidden")
                e.target.childNodes[1].classList.remove("opacity-0")
            } else {
                e.target.classList.remove("bg-gradient-to-r")
                e.target.classList.add("bg-red-700")
                e.target.childNodes[2].classList.remove("opacity-0")
            }
        }

        const scoring = () => {
            if (state.answer == ans) {
                state.incrementCorrectCount()
                state.addAnswerStreak(1)
                state.setIsQuesCorr(true)
            } else {
                state.incrementIncorrectCount()
                state.resetAnswerStreak()
                state.setIsQuesCorr(false)
            }

            state.setChoiceModal(true)
            state.setUpdateQ(true)
        }

        setTimeout(function () {
            addSign()
            scoring()
        }, 500);
    }

    return (
        <div ref={choiceRef} className="q-choices flex-2 grid grid-cols-2 text-lg gap-4 mr-8">
            {
                choices.map((choice, index) => (
                    <div key={choice.name} onClick={(e) => submitAnswer(e, choice.name)} className="choice transition-all duration-500 bg-gradient-to-r from-[#DA230D] hover:from-[#d55b4e] to-[#D57F2A] hover:to-[#ff9286] w-72 rounded py-2 text-center px-4 flex justify-between items-center cursor-pointer">
                        <div className="flex items-center justify-start gap-2 pointer-events-none">
                            <span>{index == 0 ? "A" : index == 1 ? "B" : index == 2 ? "C" : "D"}.</span>
                            <span>{choice.name}</span>
                        </div>
                        <div className="transition-all duration-500 opacity-0 pointer-events-none">
                            <BsCheckLg />
                        </div>
                        <div className="transition-all duration-500 opacity-0 pointer-events-none">
                            <FaTimes />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default GameChoices;