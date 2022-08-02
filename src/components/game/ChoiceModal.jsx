import CountUp from 'react-countup';
import { BsCheckLg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import useStore from "../../store";

function ChoiceModal() {
    const state = useStore((state) => state);
    // const toAddScore = (globalVariable.maxTime - state.time) * 60

    // const checkAnswer = () => {
    //     if (modalMode == "correct") {
    //         state.incrementCorrectCount()
    //         console.log(state.time)
    //         state.addScore(toAddScore)
    //     } else {
    //         state.incrementIncorrectCount()
    //     }

    //     if (state.questionNumber == 9) {
    //         alert("Game Over")
    //     } else {
    //         state.setUpdateQ(true)
    //     }
    // }

    // useEffect(() => {
    //     state.selectedChoice ? checkAnswer() : null
    // }, [state.selectedChoice]);

    return (
        <div className={`choiceModal absolute z-50 transition-all duration-300 inset-0 top-[100vh] ${state.choiceModal ? "top-0" : ""} ${state.isQuesCorr ? "bg-green-400" : "bg-[#FF3355]"} w-full h-64 text-white font-Saira flex flex-col gap-2 items-center justify-center`}>
            {
                state.isQuesCorr ? (
                    <>
                        <h1 className="modal-title text-5xl">Correct</h1>
                        <BsCheckLg className="rotate-in-center text-8xl" />
                        <div className='text-white text-2xl flex items-center gap-4'>
                            <p>Answer Streak</p>
                            <p className='rounded-full bg-[#603FC6] w-10 h-10 flex items-center justify-center'>{<CountUp duration={2} end={state.continousScore} />}</p>
                        </div>
                        <div className="bg-black/20 px-4 py-2 mt-4 w-80 text-3xl text-center font-bold">
                            + {<CountUp duration={2} end={state.score} />}
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="rotate-in-center modal-title text-5xl">Incorrect</h1>
                        <FaTimes className="rotate-in-center text-8xl" />
                        <p className="text-white text-2xl">Answer Streak Lost</p>
                        <div className="bg-black/20 px-4 py-2 mt-4 w-80 text-lg">
                            <p className={`${state.choiceModal ? "line-1 anim-typewriter" : ""}`}>Keep Trying. Don't lost your hope.</p>
                        </div>
                    </>
                )
            }

        </div >
    );
}

export default ChoiceModal;