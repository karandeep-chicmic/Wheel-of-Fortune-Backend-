const { createSuccessResponse } = require("../helpers");
const { wheelService, rtpService } = require("../services");
const gameService = require("../services/gameService");
const { getGames } = require("../services/gameService");
const CONSTANTS = require("../utils/constants");
const { SUCCESS } = require("../utils/messages");
const commonFunctions = require("../utils/utils");
const { convertIdToMongooseId } = require("../utils/utils");

const spinTheWheel = async (payload) => {
  const { wheelId, userId, betAmount, retryCounter } = payload;

  // user outcome to return
  let userOutcome = [];
  let userReward = 0;

  // find wheel and find symbols with it
  const findWheel = await wheelService.aggregateWithSymbols(
    convertIdToMongooseId(wheelId)
  );

  // find user rtp
  let findRtpOfUser = await rtpService.findOne({
    userId: convertIdToMongooseId(userId),
    wheelId: convertIdToMongooseId(wheelId),
  });

  //  calculate the outcome
  userOutcome = userOutcome.concat(handleSymbol(findWheel[0]?.symbols[0]));
  if (userOutcome[0].symbolsType === CONSTANTS.ARROW_SYMBOLS.ARROW_SYMBOL) {
    userOutcome = userOutcome.concat(handleSymbol(findWheel[0]?.symbols[1]));
    if (userOutcome[1].symbolsType === CONSTANTS.ARROW_SYMBOLS.ARROW_SYMBOL) {
      userOutcome.push({ jackpot: CONSTANTS.JACKPOT_AMOUNT });
    }
  }

  // if win then positive if loss than negative
  if (userOutcome[userOutcome.length - 1].symbolsType === 1) {
    userReward = -userOutcome[userOutcome.length - 1].amountPayout * betAmount;
  } else {
    userReward = userOutcome[userOutcome.length - 1].amountPayout * betAmount;
  }

  // if rtp does'nt exists then create
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

  // get game stats where we get rtp and winning percentage as of all games played
  let getGame = await getGames(userId, wheelId);

  /** 
  first: check for rtCheck key , 
  second: if we want to check according to table, 
  third: if calculated rtp is less than given rtp of user
  */
  if (
    (findRtpOfUser.rtpCheck ||
      Object.keys(CONSTANTS.MINIMUM_RTP_CALCULATION).includes(
        findRtpOfUser.totalSpins + 1
      )) &&
    getGame[0].rtp < findRtpOfUser.rtpPercentage
  ) {
    // if reward is negative then i want to rerun the function till i get positive
    const maxRetries = 10;
    if (userReward < 0 && retryCounter < maxRetries) {
      await rtpService.updateOne(
        {
          userId: convertIdToMongooseId(userId),
          wheelId: convertIdToMongooseId(wheelId),
        },
        {
          $set: {
            rtpCheck: true,
          },
        }
      );

      retryCounter++;
      return await spinTheWheel(payload);
    }
  } else if (
    (getGame[0]?.rtp ?? 0) > findRtpOfUser?.rtpPercentage &&
    findRtpOfUser.rtpCheck
  ) {
    await rtpService.updateOne(
      {
        userId: convertIdToMongooseId(userId),
        wheelId: convertIdToMongooseId(wheelId),
      },
      {
        $set: {
          rtpCheck: false,
        },
      }
    );
  }

  // create game result entry
  const gameResult = await gameService.createGame({
    winLossStatus:
      userOutcome[userOutcome.length - 1].symbolsType === 1 ? 2 : 1,
    outcome: userOutcome.map((outcome) => convertIdToMongooseId(outcome._id)),
    betAmount: betAmount,
    outcomeAmount: Math.abs(userReward),
    userId: convertIdToMongooseId(userId),
    wheelId: convertIdToMongooseId(wheelId),
  });

  // increase the number of spins
  await rtpService.updateOne(
    {
      userId: convertIdToMongooseId(userId),
      wheelId: convertIdToMongooseId(wheelId),
    },
    {
      $inc: {
        totalSpins: 1,
      },
    }
  );

  // create success response
  return createSuccessResponse("working", gameResult);
};

const handleSymbol = (symbolsArray) => {
  let arrowCount = 0;
  let userOutcome = [];
  let findRandomSymbol;

  while (arrowCount < 2) {
    findRandomSymbol = commonFunctions.getRandomObject(symbolsArray);

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
};

const adminGameDetails = async () => {
  const gameDetails = await gameService.getAdminGameDetails();

  return createSuccessResponse(SUCCESS, gameDetails);
};

module.exports = {
  spinTheWheel,
  adminGameDetails,
};
