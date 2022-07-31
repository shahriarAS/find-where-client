import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebaseConfig.js';
import useStore from "../store/index";

function useResetState() {
    const state = useStore((state) => state)
    const [user, loading, error] = useAuthState(auth);


    const getDataOnce = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data()
            localStorage.setItem("gameLevel", data.level)
            console.log("Reset Data")
            state.resetState({
                highScore: data.highScore,
                bestTime: data.bestTime,
                level: data.level,
                isSound: data.settings.isSound,
                isMusic: data.settings.isMusic,
                difficulty: data.settings.difficulty
            })
        } else {
            console.log("No such document!");
        }
    }

    return () => {
        if (user) {
            getDataOnce()
            console.log("getDataOnce()")
        } else {
            state.resetState()
            console.log("state.resetState()")
        }
    }
}

export default useResetState