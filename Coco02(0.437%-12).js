var config = {
    name: { value: 'coco([])', type: 'text', label: 'Name'},
    baseBet: { label: "base bet", value: currency.minAmount, type: "number" },
    payout: { label: "payout", value: 2, type: "number" },
    stop: { label: "stop if next bet >", value: 1e8, type: "number" },
    lossMultiplier: { label: "loss multiplier", value: 1, type: "number" },
  };
  function main() {
    var currentBet = config.baseBet.value;
    var consequenceLoss = 0;
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
                consequenceLoss = 0;      
                currentBet = config.baseBet.value;
                log.success(
                    "We won, so next bet will be " +
                    currentBet +
                    " " +
                    currency.currencyName
                );
            } else {
                log.error("Lose! " + payout);
                totalWin -= currentBet;
                consequenceLoss += 1; 
                currentBet = config.baseBet.value * (1 + consequenceLoss * 0.00001);
                log.error("next multiplier: " + (1 + consequenceLoss * 0.00001));
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