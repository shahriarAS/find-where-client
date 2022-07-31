const fs = require('fs');
const Axios = require('axios')
const download = require('image-downloader');
const hiddenGames = require("./hidden_games.json")

let allLink = []
function getAllLink() {
    hiddenGames.forEach(item => {
        allLink.push(item.request.url)
    })
}

// let allLink = ['https://previews.customer.envatousercontent.com/files/256201875/images/yellowcup-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/ward-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/triger-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/trash-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/touchcorrec-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/top_timer-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/title-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/tire-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/timerup-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/timertxt.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/telescope-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/teapot-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/tea-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/subtimer-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/sprite-sheet2.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/sprite-sheet1.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/sprite-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/space-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/soundoff-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/smart-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/select-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/rotate_effect-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/room-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/rocket-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/rewardblock-sheet2.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/rewardblock-sheet1.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/rewardblock-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/retru-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/recompensas-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/playbtn-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/plant-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/pillow-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/particles.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/ob-sheet1.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/ob-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/notebook-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/next-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/new_logofw-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/morebtn-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/monitor-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/markasfavoritestar-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/mark-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/lv-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/little_logo-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/light-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/leftarrow-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/img9-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/img3-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/img2-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/img11-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/img10-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/img-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/icon-256.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/icon-256.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/hoop-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/homebtn-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/hamper-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/hamb-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/guitar-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/glove-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/globe-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/fres-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/foundtxt.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/finalscore.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/fan-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/ext-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/eletricy-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/drawer-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/cube-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/complete-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/chair-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/carpet-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/car-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/cam-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/bucket2-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/bucket-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/btnrw-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/board2-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/board-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/blcar-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/blackscreen-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/black-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/bg-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/bedside-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/battery-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/baskball-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/ball-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/astron-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/arrowright-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/arrowleft-sheet0.png',
//     'https://previews.customer.envatousercontent.com/files/256201875/images/apple-sheet0.png'
// ]


async function downloadImage(url, filepath) {
    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath));
    });
}

getAllLink()
allLink.forEach(link => {
    console.log("Downloading: ", link.split('/').pop())

    downloadImage(link, `${link.split('/').pop()}`)
})