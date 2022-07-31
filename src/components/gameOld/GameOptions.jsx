import controlBG from "../../assets/images/control-bg.png";
import GameControl from "./GameControl";
function GameOptions({ goFullScreen, closeScreen }) {
    return (

        <div className="game-options w-56 h-full flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${controlBG})` }}>
            <GameControl goFullScreen={goFullScreen} closeScreen={closeScreen}/>
        </div>
    );
}

export default GameOptions;