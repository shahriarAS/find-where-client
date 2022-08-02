export default function uniqueRandomNumList(max, count) {
    var arr = [];
    while (arr.length < count) {
        var r = Math.floor(Math.random() * max) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}