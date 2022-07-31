import { useState } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import useStore from "../../store";
import generateRandomInRange from "../../utils/generateRandomInRange";

function JoinModal({ openJoinModal, setOpenJoinModal, setStartGame, gameCodeQuery }) {
    const state = useStore((state) => state)
    const [gameCode, setGameCode] = useState(gameCodeQuery ? gameCodeQuery : "")
    const socket = useStore((state) => state.socket)
    const [joinMsg, setJoinMsg] = useState()

    const closeModalOnShadowClick = (e) => {
        if (e.target.id == "overlay") {
            setOpenJoinModal(false)
        }
    }

    const joinGameClick = () => {
        if (gameCode.trim().length > 0) {
            state.setGameCode(gameCode)
            const level = generateRandomInRange(1, 8)
            state.setLevel(level)
            console.log("Joining Game: ", level)
            socket.emit("join-game", gameCode, state.username, level, joinResponse => {
                joinResponse && toast.error(joinResponse)
            })
        } else {
            toast.error("Empty Game Code. Please provide valid code.", {
                duration: 800
            })
        }
    }

    socket.on("other-joined", (msg, gameLevel) => {
        setJoinMsg(msg)
        setStartGame(true)
        state.setGameMode("multiplayer")
    })

    return (
        <div id="overlay" className={`fixed transition-all duration-700 w-full h-screen inset-0 ${openJoinModal ? "inset-0" : "-left-[100%]"} bg-gray-800/50 flex items-center justify-center`} onClick={(e) => closeModalOnShadowClick(e)}>
            <div className="relative join-game rounded-lg w-96 h-56 flex items-center justify-center text-[#424242] text-5xl bg-gradient-to-r from-[#84fab0] to-[#8fd3f4]">
                <div className="absolute right-4 top-1 w-6 cursor-pointer" onClick={() => setOpenJoinModal(false)}>
                    <GrClose className="w-full" />
                </div>

                <div className="w-full flex flex-col items-center justify-center text-xl">
                    <div className="register-div flex items-center justify-center rounded border border-[#424242]">
                        {/* <p className="register-input bg-transparent-label text-md ml-2">
                            Game ID :
                        </p> */}
                        <input value={gameCode} onChange={(e) => setGameCode(e.target.value)} className="register-input w-64 bg-transparent text-md p-1 px-2 text-center" />
                        {/* <p className="register-input bg-transparent-label text-md p-1 px-2 cursor-default bg-[#424242] text-white" onClick={pasteGameCodeOnClick}>
                            Paste
                        </p> */}
                    </div>
                    {
                        joinMsg ? <p className="register-text mt-4 px-12 py-2 text-lg rounded-3xl drop-shadow-2xl">{joinMsg}</p> : (
                            <button onClick={joinGameClick} className="register-btn mt-4 px-12 py-2 bg-[#A900FD] text-white text-2xl rounded-3xl drop-shadow-2xl">
                                Join
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default JoinModal;