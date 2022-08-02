import helpImg from "../../assets/images/help.png";
import powerImg from "../../assets/images/power.png";
// import timeBadge from "../../assets/images/time-badge.png";
import zoomInImg from "../../assets/images/zoom-in.png";
import zoomOutImg from "../../assets/images/zoom-out.png";
import useStore from "../../store";

function GameScreenOverlay() {
    const state = useStore((state) => state)
    return (
        <>
            <div className="power-div z-10 absolute inset-0 w-24 cursor-pointer">
                <img src={powerImg} alt="Power" className="w-full" />
            </div>
            <div className="help-div z-10 absolute right-4 top-4 w-12 cursor-pointer">
                <img src={helpImg} alt="help" className="w-full" />
            </div>
            <div className="zoom-div z-10 absolute right-4 bottom-16 w-10 flex flex-col items-center gap-2">
                <img src={zoomInImg} alt="Zoom In" className="cursor-pointer" />
                <img src={zoomOutImg} alt="Zoom Out" className="cursor-pointer" />
            </div>
            <div className={`gameBadge absolute bottom-0 w-full flex ${state.gameMode == "multiplayer" ? "justify-between" : "justify-end"} text-white text-2xl font-bold`}>
                {state.gameMode == "multiplayer" ? (
                    <div className="w-56 h-10 flex items-center justify-start p-2 bg-gradient-to-r from-[#fc221d] to-[#aa00fa]" style={{ clipPath: "polygon(0 1%, 85% 0, 100% 100%, 0% 100%)" }}>Opponent Score</div>
                ) : null}
                <div className="w-44 h-10 flex items-center justify-end p-2 bg-gradient-to-r from-[#fc221d] to-[#aa00fa]" style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}>Your Score</div>
            </div>
        </>
    );
}

export default GameScreenOverlay;