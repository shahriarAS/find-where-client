import { doc, increment, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebaseConfig";
import useStore from "../../store";
import generateRandom from "../../utils/generateRandom";

function GameOverModal() {
    const [user, loading, error] = useAuthState(auth);
    const state = useStore((state) => state)

    const updateDB = () => {
        console.log("In Update DB")

        if (user) {
            const gamePlayedRef = doc(db, "users", auth.currentUser.uid);
            const gameID = generateRandom()

            const addResulToDB = async () => {
                await updateDoc(gamePlayedRef, {
                    totalScore: increment(state.score),
                    // winCount: (state.correctCount > state.incorrectCount) ? increment(1) : increment(0),
                    totalMatch: increment(1),
                    highScore: state.score > state.highScore ? state.score : increment(0),
                    [`gamePlayed.${gameID}`]: {
                        score: state.score,
                        opponentScore: state.opponentScore,
                        correct: state.correctCount,
                        incorrect: state.incorrectCount,
                        hintTook: state.hintTook,
                        gameMode: state.gameMode,
                        gameName: state.playBy,
                        createdAt: Date.now()
                    }
                });
            }

            addResulToDB()
        }
    }

    useEffect(() => {
        state.gameOver == true ? updateDB() : null
    }, [state.gameOver]);

    return (
        <div className={`choiceModal absolute z-50 transition-all duration-500 ${state.gameOver == true ? "top-0" : "-top-[100%]"} bg-green-400 w-full h-full py-4 text-white font-Saira flex flex-col items-center justify-center`}>
            <div className="bg-black/20 px-4 py-1 w-80 text-3xl text-center font-bold">
                <h1 className="text-2xl text-white">Game Over</h1>
            </div>
            <p className="text-xl">Score: {state.score}</p>
            <p className="text-xl">Correct: {state.correctCount}</p>
            <p className="text-xl">Incorrcet: {state.incorrectCount}</p>
            <Link to="/">Home</Link>
        </div >
    );
}

export default GameOverModal;