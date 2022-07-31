import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import button from "../../assets/images/button.png";
import fullscreenOn from "../../assets/images/fullscreen-on.png";
import music1 from "../../assets/images/music1.png";
import music2 from "../../assets/images/music2.png";
import sound1 from "../../assets/images/sound1.png";
import sound2 from "../../assets/images/sound2.png";
import { auth, db } from '../../config/firebaseConfig';
import useStore from "../../store";
import GameStat from "./GameStat";

function GameControl({ goFullScreen, closeScreen }) {
    const state = useStore((state) => state)
    const [user, loading, error] = useAuthState(auth);

    const showHint = () => {
        state.setShowHint(true)
        setTimeout(function () {
            state.setShowHint(false)
        }, 400);
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
        <div className="game-controls w-full border bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center py-4 gap-4">
            <div className="relative control-btn w-32 h-14 flex items-center justify-center text-center text-white font-bubblegum text-3xl transition-all duration-75 cursor-pointer hover:shadow-2xl hover:scale-105" onClick={showHint}>
                <img src={button} alt="" className="aboslute inset-0 w-full h-full" />
                <p className="absolute">Hint</p>
            </div>
            {
                state.gameMode == "singleplayer" ? (
                    <div className="relative control-btn w-32 h-14 flex items-center justify-center text-center text-white font-bubblegum text-3xl transition-all duration-75 cursor-pointer hover:shadow-2xl hover:scale-105" onClick={() => {
                        // Reduce Time Problem Fixed. Warning! Don't touch without prior knowledge
                        state.setReduceTime(0)
                        state.setGamePause(true)
                    }}>
                        <img src={button} alt="" className="aboslute inset-0 w-full h-full" />
                        <p className="absolute">Pause</p>
                    </div>
                ) : null
            }
            <GameStat />
            <div className="control-panel flex gap-2 text-2xl">
                {
                    state.isSound ? (<img onClick={toggleSoundSetting} src={sound1} width={40} alt="Sound" className="cursor-pointer" />) : (<img onClick={toggleSoundSetting} src={sound2} width={40} alt="No Sound" className="cursor-pointer" />)
                }
                {
                    state.isMusic ? (<img onClick={toggleMusicSetting} src={music1} width={40} alt="Music" className="cursor-pointer" />) : (<img onClick={toggleMusicSetting} src={music2} width={40} alt="No Music" className="cursor-pointer" />)
                }
                {
                    state.isFullScreen ? (
                        <img src={fullscreenOn} onClick={goFullScreen} width={40} alt="Full Screen" className="cursor-pointer" />
                    ) : (
                        <img src={fullscreenOn} onClick={closeScreen} width={40} alt="Full Screen" className="cursor-pointer" />
                    )
                }
            </div>
        </div>
    );
}

export default GameControl;