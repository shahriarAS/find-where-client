/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */

function generateRandomInRange(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

export default generateRandomInRange