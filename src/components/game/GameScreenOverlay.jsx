import helpImg from "../../assets/images/help.png";
import powerImg from "../../assets/images/power.png";
import scoreBadge from "../../assets/images/score-badge.png";
// import timeBadge from "../../assets/images/time-badge.png";
import zoomInImg from "../../assets/images/zoom-in.png";
import zoomOutImg from "../../assets/images/zoom-out.png";

function GameScreenOverlay() {
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
            <div className="gameBadge absolute bottom-0 w-full h-[6vh] flex justify-end">
                {/* <img src={timeBadge} alt="Time" /> */}
                <img src={scoreBadge} alt="Score" />
            </div>
        </>
    );
}

export default GameScreenOverlay;