const { createSuccessResponse, createErrorResponse } = require("../helpers");
const rtpService = require("../services/rtpService");
const { MESSAGES, ERROR_TYPES } = require("../utils/constants");
const { BAD_REQUEST } = require("../utils/messages");


const setGlobalRtp = async (payload) => {
    const { rtpPercentage } = payload;

    let condition = {
        $set: {
            globalRtp: false
        }
    }

    if (rtpPercentage) {
        condition = {
            $set: {
                rtpPercentage: rtpPercentage,
                globalRtp: true

            }
        }
    }

    const res = await rtpService.updateOneGlobal({}, condition, { upsert: true })

    if (!res) {
        return createErrorResponse(BAD_REQUEST, ERROR_TYPES.BAD_REQUEST, {})
    }
    return createSuccessResponse(MESSAGES.SET_GLOBAL_RTP, res);
}

const setUserRtp = async (payload) => {
    const { usersId, rtpPercentage } = payload;

    const res = await rtpService.updateMany(
        { userId: usersId },
        {
            $set: { rtpPercentage: rtpPercentage, globalRtp: false }
        })
    if (!res) {
        return createErrorResponse(BAD_REQUEST, ERROR_TYPES.BAD_REQUEST, {})
    }
    return createSuccessResponse(MESSAGES.SUCCESS, res);

}

module.exports = {
    setGlobalRtp,
    setUserRtp
}