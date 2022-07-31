import { useEffect, useState } from "react";
import grid from "../../assets/images/grid.jpg";
import useStore from "../../store";
import getFilename from "../../utils/getFilename";

function GameTargetItems() {
    const [imgItemState, setImgItemState] = useState([]);
    const state = useStore((state) => state)

    useEffect(() => {
        setImgItemState([])
        state.targetItems[`level${state.level}`].forEach(imgName => {
            import(`../../assets/images/${imgName.file}.png`).then(image => {
                setImgItemState(prevState => (
                    [...prevState, image.default]
                ))
            }
            )
        });
        console.log("FIRE ONCE")
    }, [state.targetItems, state.level]);

    return (
        <div className="game-target p-2 flex flex-col items-center justify-center gap-1">
            {
                imgItemState.map(
                    item => (
                        <div key={`target_${item}`} id={getFilename(item)} onClick={() => removeItem(item)} className="target p-2 w-20 h-20 bg-no-repeat bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${grid})` }}>
                            <img src={item} alt="Object 5" />
                        </div>
                    )
                )
            }
        </div>
    );
}

export default GameTargetItems;