// testing coco(0.83-6)

function coco01(percentage) {
    let ori = 100;
    let lossPerRound = 0;
    let totalLoss = 0;
    for(let i = 1;;i++) {
        lossPerRound = lossPerRound * 2 + 1;
        totalLoss += lossPerRound;
        if(totalLoss * percentage > ori) break;
        console.log(`Round ${i}: loss = ${lossPerRound * percentage} total = ${totalLoss * percentage}`);
    }
}


coco01(0.098);
// 0.0985% = 9
// 1% = 5