import { useEffect, useRef, useState } from "react";
import useSound from 'use-sound';
import rightSound from "../../assets/audio/right.mp3";
import wrongSound from "../../assets/audio/wrong.mp3";
import bg1 from "../../assets/images/bg1.jpg";
import vanish from "../../assets/images/vanish.gif";
import useStore from "../../store";
import getFilename from "../../utils/getFilename";
import HiddenObject from "./HiddenObject";

function GameArea() {
    const [imgItemState, setImgItemState] = useState([]);
    const vanishRef = useRef()
    const state = useStore((state) => state)
    const socket = useStore((state) => state.socket)
    const [playRightSound] = useSound(rightSound);
    const [playWrongSound] = useSound(wrongSound);

    const removeItem = (e, item) => {
        const soln = state.targetItems[`level${state.level}`].map(i => i.file)
        if (soln.includes(getFilename(item))) {
            state.isSound ? playRightSound() : null
            const vanishEl = vanishRef.current
            vanishEl.style.left = `${e.target.x - (e.target.width + 20)}px`
            vanishEl.style.top = `${e.target.y - (e.target.height + 20)}px`
            vanishEl.classList.remove("hidden")
            e.target.classList.add("bounce-out-top")

            if (state.gameMode == "multiplayer") {
                console.log("Socket Emit Add: ", e.target)
                socket.emit("add-score", state.gameCode, e.target.id, item)
            }

            setTimeout(function () {
                e.target.style.visibility = "hidden"
                e.target.style.opacity = 0
                state.removeTargetItem(state.level, getFilename(item))
                state.addScore()
                if (state.continousScore == 2) {
                    // toast.success("You got Bonus 3 Point.")
                    state.setGameBonus(true)
                    state.addScore(3)
                    state.resetContinousScore()
                } else {
                    state.addContinousScore(1)
                }

                // if (state.targetItems[`level${state.level}`].length == 1) {
                //     state.setGameOver(true)
                // }

                setTimeout(function () {
                    vanishEl.classList.add("hidden")
                }, 400);
            }, 400);
        } else {
            // toast.error("Wrong! 10 Seconds Reduced.")
            state.isSound ? playWrongSound() : null
            setTimeout(function () {
                state.setReduceTime(Math.random())
                e.target.classList.remove("shake-horizontal")
                state.resetContinousScore()
            }, 500);
            e.target.classList.add("shake-horizontal")
        }
    }

    useEffect(() => {
        setImgItemState([])

        var levelList = [];
        for (let i = 0, j = 3; i < j; i++) {
            let randNumber = Math.round(Math.random() * state.maxLevel)
            if (!levelList.includes(randNumber) & randNumber > 0) {
                levelList.push(randNumber)
            } else {
                i--
            }
        }
        if (!levelList.includes(parseInt(state.level))) {
            levelList.push(parseInt(state.level))
        }

        // Dynamic Import
        levelList.forEach(i => {
            state.targetItems[`level${i}`].forEach(imgName => {
                import(`../../assets/images/${imgName.file}.png`).then(image => {
                    setImgItemState(prevState => (
                        [...prevState, { file: image.default, position: imgName.position }]
                    ))
                }
                )
            });
        })
        // for (let i = 1; i < (state.maxLevel + 1); i++) {

        // }
        console.log("FIRE ONCE")
    }, [state.level]);

    return (
        <div className="game-area w-full h-full mr-1 relative overflow-hidden bg-contain bg-no-repeat">
            <img src={bg1} alt="" className="w-full h-full" loading="lazy" />
            <img src={vanish} ref={vanishRef} alt="Vanish" className="absolute hidden z-50" />
            {
                imgItemState.map(
                    imgItem => (
                        <HiddenObject key={`hidden_${imgItem.file}`} img={imgItem.file} top={imgItem.position[0]} left={imgItem.position[1]} removeItem={removeItem} />
                    )
                )
            }
        </div>
    );
}

export default GameArea;