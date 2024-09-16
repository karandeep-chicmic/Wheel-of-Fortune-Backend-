const { createSuccessResponse } = require("../helpers");
const { wheelService, rtpService } = require("../services");
const CONSTANTS = require("../utils/constants");
const commonFunctions = require("../utils/utils");
const { convertIdToMongooseId } = require("../utils/utils");

const spinTheWheel = async (payload) => {
  const { wheelId, userId, betAmount } = payload;

  let userOutcome = [];
  let userReward = 0;

  const findWheel = await wheelService.aggregateWithSymbols(
    convertIdToMongooseId(wheelId)
  );

  let findRtpOfUser = await rtpService.findOne({
    userId: convertIdToMongooseId(userId),
    wheelId: convertIdToMongooseId(wheelId),
  });

  userOutcome = userOutcome.concat(handleSymbol(findWheel[0]?.symbols[0]));
  if (userOutcome[0].symbolsType === CONSTANTS.ARROW_SYMBOLS.ARROW_SYMBOL) {
    userOutcome = userOutcome.concat(handleSymbol(findWheel[0]?.symbols[1]));
    if (userOutcome[1].symbolsType === CONSTANTS.ARROW_SYMBOLS.ARROW_SYMBOL) {
      userOutcome.push({ jackpot: CONSTANTS.JACKPOT_AMOUNT });
    }
  }

  if (userOutcome[userOutcome.length - 1].symbolsType === 1) {
    userReward = -userOutcome[userOutcome.length - 1].amountPayout * betAmount;
  } else {
    userReward = userOutcome[userOutcome.length - 1].amountPayout * betAmount;
  }


  if (!findRtpOfUser) {
    findRtpOfUser = await rtpService.create({
      userId: convertIdToMongooseId(userId),
      wheelId: convertIdToMongooseId(wheelId),
      rtpPercentage: CONSTANTS.RETURN_TO_PLAYER.DEFAULT,
      totalSpins: 0,
      winingProbability: 0,
      betLimitation: 10000,
      rtpCheck: false,
    });
  }

    if(findRtpOfUser.rtpCheck || Object.keys(CONSTANTS.MINIMUM_RTP_CALCULATION).includes(findRtpOfUser.totalSpins + 1) ){

    }

  //   findWheel[0].symbols;

  return createSuccessResponse("working", { userOutcome, userReward });
};

function handleSymbol(symbolsArray) {
  let arrowCount = 0;
  let userOutcome = [];
  let findRandomSymbol;

  while (arrowCount < 2) {
    findRandomSymbol = getRandomSymbol(symbolsArray);

    if (findRandomSymbol.symbolsType === CONSTANTS.ARROW_SYMBOLS.ARROW_SYMBOL) {
      arrowCount++;

      if (arrowCount === 2) {
        userOutcome.push(findRandomSymbol);
        return userOutcome;
      }
    } else {
      userOutcome.push(findRandomSymbol);
      return userOutcome;
    }
  }

  return userOutcome;
}

function getRandomSymbol(symbolsArray) {
  return commonFunctions.getRandomObject(symbolsArray);
}

module.exports = {
  spinTheWheel,
};
