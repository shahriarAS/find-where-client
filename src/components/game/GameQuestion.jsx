import useStore from "../../store";

function GameQuestion() {
    const state = useStore((state) => state);

    return (
        <div className="question h-full flex-1">
            <p className="q-title text-3xl">Question: {state.questionNumber+1}</p>
            <p className="q-text mt-4 text-2xl w-2/3">What is the mentioned country in the map?</p>
        </div>
    );
}

export default GameQuestion;