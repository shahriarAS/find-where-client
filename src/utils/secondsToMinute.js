function secondsToMinute(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    return {
        minutes, seconds
    }

}

export default secondsToMinute