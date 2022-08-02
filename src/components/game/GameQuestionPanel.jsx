import { useEffect, useState } from "react";
import useStore from "../../store";
import ChoiceModal from "./ChoiceModal";
import GameChoices from "./GameChoices";
import GameQuestion from "./GameQuestion";

function GameQuestionPanel() {
    const [loading, setLoading] = useState(false)
    const state = useStore((state) => state);
    const choices = state.choices

    const updateQuestion = () => {
        setTimeout(function () {
            if (state.questionNumber < (state.questionSet.length - 1)) {
                state.addQuestionNumber(1)
                state.setAnswer()
            }
            state.setUpdateQ(false)
            state.setChoiceModal(false)
        }, 4000)
    }

    // const checkAnswer = (givenAns) => {
    //     if (state.answer == givenAns) {
    //         // toast.success("Correct! Acheived 10 Points")
    //         state.incrementCorrectCount()
    //         state.addScore((globalVariable.maxTime - state.time) * 60)
    //     } else {
    //         // toast.error("Wrong! Don't give up.")
    //         state.incrementIncorrectCount()
    //     }

    //     if (state.questionNumber == 9) {
    //         alert("Game Over")
    //     } else {
    //         state.setUpdateQ(true)
    //     }
    // }



    useEffect(() => {
        state.setChoices()
        state.setAnswer()

        if (state.updateQ == true) {
            updateQuestion()
        }
    }, [state.updateQ]);


    return (
        <>
            <div className="quiz w-full h-[22vh] flex justify-between items-center uppercase text-white font-bold px-4">
                <GameQuestion />
                <GameChoices choices={choices} />
            </div>
            <ChoiceModal />
        </>
    );
}

export default GameQuestionPanel;