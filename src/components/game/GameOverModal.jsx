import useStore from "../../store";

function GameOverModal() {
    const state = useStore((state) => state)

    return (
        <div className={`choiceModal absolute z-50 transition-all duration-500 ${state.gameOver == true ? "top-0" : "-top-[100%]"} bg-green-400 w-full h-full py-4 text-white font-Saira flex flex-col items-center justify-center`}>
            <div className="bg-black/20 px-4 py-1 w-80 text-3xl text-center font-bold">
                <h1 className="text-2xl text-white">Game Over</h1>
            </div>
        </div >
    );
}

export default GameOverModal;