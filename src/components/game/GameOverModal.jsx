import { doc, increment, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../../config/firebaseConfig";
import useStore from "../../store";
import generateRandom from "../../utils/generateRandom";
import MultiPlayerGameOver from "./MultiPlayerGameOver";
import SinglePlayerGameOver from "./SinglePlayerGameOver";

function GameOverModal() {
    const [user, loading, error] = useAuthState(auth);
    const state = useStore((state) => state)

    const updateDB = () => {
        // console.log("In Update DB")

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

        (state.gameMode == "singleplayer") ?
            <SinglePlayerGameOver /> : <MultiPlayerGameOver />


    );
}

export default GameOverModal;