import { Link } from "react-router-dom";
import useStore from "../../store";

function GamePauseModal() {
    const state = useStore((state) => state)

    return (

        <div className={`absolute z-50 transition-all duration-500 ${state.gamePause == true ? "top-0" : "-top-[100%]"} w-full h-full py-8 bg-gradient-to-r bg-black/70 flex items-center justify-around font-Saira`}>
            <div className="text-white text-center">
                <p className="text-3xl">Are you sure want to exit?</p>
                <div className="flex gap-4 items-center justify-center mt-8 text-xl font-bold">
                    <Link to="/" className="w-32 py-2 transition duration-200 rounded bg-gradient-to-r from-[#DA230D] to-[#D57F2A] hover:scale-110">Exit</Link>
                    <button className="w-32 py-2 transition duration-200 rounded bg-gradient-to-r from-[#fc221d] to-[#aa00fa] hover:scale-110" onClick={() => state.setGamePause(false)}>Continue</button>
                </div>
            </div>

        </div >
    )
}

export default GamePauseModal;