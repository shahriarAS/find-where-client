import useStore from "../../store";
import getFilename from "../../utils/getFilename";

function HiddenObject({ img, top, left, removeItem }) {
    const state = useStore((state) => state)

    return (
        <>
            <img id={getFilename(img)} src={img} width={60} height={40} className="absolute" alt={getFilename(img)} style={{ left: `${left}%`, top: `${top}%`, visibility: "visible", opacity: 1, transition: "opacity 250ms ease-in, visibility 0ms ease-in 250ms" }} onClick={(e) => removeItem(e, img)} loading="lazy" />
        </>
    );
}

export default HiddenObject;