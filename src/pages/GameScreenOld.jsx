import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import controlBG from "../assets/images/control-bg.png";
import wood from "../assets/images/wood_black.jpg";
import GameArea from "../components/game/GameArea";
import GameBonusModal from "../components/game/GameBonusModal";
import GameOptions from "../components/game/GameOptions";
import GameOverModal from "../components/game/GameOverModal";
import GamePauseModal from "../components/game/GamePauseModal";
import GameStartModal from "../components/game/GameStartModal";
import GameTargetItems from "../components/game/GameTargetItems";
import useStore from "../store/index";
import globalVariable from "../utils/globalVariable";

function GameScreen() {
    const state = useStore((state) => state)
    const imgRef = useRef()
    const appRef = useRef();

    const goFullScreen = () => {
        state.toggleFullScreen()
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
        }
    };

    const closeScreen = async () => {
        state.toggleFullScreen()
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    };

    const hintExecute = () => {
        if (state.hintTook < globalVariable.maxHint) {
            const imgEl = appRef.current
            const gameScreenNode = imgEl.childNodes[1].childNodes
            console.log(gameScreenNode)
            let isBreak = false
            gameScreenNode.forEach(node => {
                console.log(node)
                if (state.showHint & state.targetItems[`level${state.level}`].map(i => i.file).includes(node.id) & isBreak == false) {
                    node.classList.add("border-8", "border-red-500", "rounded-full", "jello-horizontal")
                    setTimeout(function () {
                        node.classList.remove("border-8", "border-red-500", "rounded-full", "jello-horizontal")
                    }, 1500);
                    state.setShowHint(false)
                    isBreak = true
                }
            })
            state.addHintTook()
        } else {
            toast.error(`Sorry! You can't use "Hint" more than 2 times.`)
        }
        state.setShowHint(false)
    }

    useEffect(() => {
        if (state.gameStart == "init" & state.gameMode == "singleplayer") {
            console.log("Game Start")
            state.setGameStart(true)
        }
        state.showHint ? hintExecute() : null
    }, [state.showHint]);

    return (
        <div style={{ backgroundImage: `url(${wood})` }}>
            <div ref={appRef} className="game-screen max-w-[1100px] h-screen max-h-[800px] m-auto flex items-center justify-center overflow-hidden">
                <div className="game-options px-1 mr-1 h-full flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${controlBG})` }}>
                    <GameTargetItems />
                </div>
                <GameArea />
                <GameOptions goFullScreen={goFullScreen} closeScreen={closeScreen} />
                <GamePauseModal />
                <GameOverModal />
                <GameBonusModal />
                {state.gameMode == "singleplayer" ? <GameStartModal /> : null}
            </div>
        </div>
    );
}

export default GameScreen;