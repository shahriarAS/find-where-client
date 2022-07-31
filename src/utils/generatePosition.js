const generatePosition = (width, height) => {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
    }
}

export default generatePosition