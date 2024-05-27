var config = {
    name: { value: 'coco([1.0])', type: 'text', label: 'Name'},
    baseBet: { label: "base bet %", value: 0.0985, type: "number" },
    payout: { label: "payout", value: 2, type: "number" },
    stop: { label: "stop if next bet >", value: 1e8, type: "number" },
    lossMultiplier: { label: "loss multiplier", value: 1, type: "number" },
  };
  function main() {
    var baseBet = currency.amount * config.baseBet.value / 100;
    var currentBet = baseBet;
    var consequenceLoss = 1;
    var totalWin = 0;
    var betCount = 0;
    var totalBet = 0;
    var winCount = 0;
    log.success('$$$New Journey$$$: ' + currency.amount);
    game.onBet = function () {
        betCount += 1;
        log.success('--->New Betting:' + betCount + '<---' + currency.amount);
        log.info('Betting : ' + currentBet + " " + currency.currencyName);
        totalBet += currentBet;
        game.bet(currentBet, config.payout.value).then(function (payout) {
            if (payout > 1) {
                log.success("Win! " + payout);
                winCount += 1;
                totalWin += currentBet;
                consequenceLoss = 1;      
                currentBet = baseBet;
                log.success(
                    "We won, so next bet will be " +
                    currentBet +
                    " " +
                    currency.currencyName
                );
            } else {
                log.error("Lose! " + payout);
                totalWin -= currentBet;
                consequenceLoss = consequenceLoss * 2 + 1; 
                currentBet = baseBet * consequenceLoss;
                log.error("next multiplier: " + consequenceLoss);
                log.error(
                    "We lost, so next bet will be " +
                    currentBet +
                    " " +
                    currency.currencyName
                );
            }
            log.info("TotalBet: " + totalBet);
            log.info("WinCount: " + winCount);
            log.info("TotalWin: " + totalWin);
            if (currentBet > config.stop.value) {
            log.error(
                "Was about to bet " + currentBet + " which triggers the stop"
            );
            game.stop();
            }
        });
    };
  }