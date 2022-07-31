import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import close from "../../assets/images/close.png";
import statBG from "../../assets/images/stat-bg.png";
import { auth, db } from '../../config/firebaseConfig';
import useStore from "../../store";


function GameBonusModal() {
    const state = useStore((state) => state)
    const [user, loading, error] = useAuthState(auth);

    const gameContinue = () => {
        // Reduce Time Problem Fixed. Warning! Don't touch without prior knowledge
        state.setReduceTime(0)
        state.setGameBonus(false)
    }

    const toggleSoundSetting = () => {
        if (user) {
            const gamePlayedRef = doc(db, "users", auth.currentUser.uid);
            const updateSoundDoc = async () => {
                await updateDoc(gamePlayedRef, {
                    "settings.isSound": !state.isSound
                });
            }
            updateSoundDoc()
        }
        state.toggleSound()
    }

    const toggleMusicSetting = () => {
        if (user) {
            const gamePlayedRef = doc(db, "users", auth.currentUser.uid);
            const updateMusicDoc = async () => {
                await updateDoc(gamePlayedRef, {
                    "settings.isMusic": !state.isMusic
                });
            }
            updateMusicDoc()
        }
        state.toggleMusic()
    }

    return (
        <div id="popup-modal" className={`absolute inset-0 ${state.gameBonus == true ? "slide-in-top" : state.gameBonus == false ? "-top-[100%]" : "hidden"} font-bubblegum overflow-y-auto overflow-x-hidden z-50 h-modal h-full justify-center items-center flex bg-blend-overlay bg-white/40 transition-all duration-500`} aria-modal="true" role="dialog">
            <div className="relative p-4 w-96 h-3/4">
                <div className="relative w-full h-full rounded-lg bg-cover bg-center bg-no-repeat pt-4" style={{ backgroundImage: `url(${statBG})` }}>
                    <button type="button" className="absolute bg-transparent top-3 -right-2" onClick={() => {
                        // Reduce Time Problem Fixed. Warning! Don't touch without prior knowledge
                        state.setReduceTime(0)
                        state.setGameBonus(false)
                    }}>
                        <img src={close} alt="" />
                    </button>
                    <div className="p-6 mt-12 text-center flex flex-col gap-2 justify-between items-center">
                        <h1 className="text-gray-100 text-6xl mt-1 mb-2">Bonus!</h1>
                        <p className="text-gray-100 text-xl mt-4">Outstanding! 3 Correct Find In A Row. We have BONUS for you.</p>
                        <div className="flex flex-col -gap-2">
                            <h1 className="text-gray-100 text-2xl">Previous Score: {state.score - 3}</h1>
                            <h1 className="text-gray-100 text-2xl">Total Score: {state.score - 3} + <span className="text-4xl text-[#ffd900]">3</span> = {state.score}</h1>
                        </div>
                        <div className="flex justify-between items-center gap-4 mt-2">
                            <button type="button" className="text-gray-900 bg-gray-200 border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-xl py-2.5 w-36" onClick={gameContinue}>Continue</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameBonusModal;