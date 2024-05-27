// testing coco(0.83-6)

function coco01(percentage) {
    let ori = 100;
    let lossPerRound = 0;
    let totalLoss = 0;
    for(let i = 1;;i++) {
        lossPerRound = lossPerRound * i + ((i - 1) * 0.0001);
        totalLoss += (lossPerRound * percentage);
        if(totalLoss * percentage > ori) break;
        console.log(`Round ${i}: loss = ${lossPerRound * percentage} total = ${totalLoss * percentage}`);
    }
}

coco01(0.0437);