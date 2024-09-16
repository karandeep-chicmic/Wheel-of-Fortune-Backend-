const { rtpModel } = require("../models");
const { NORMAL_PROJECTION } = require("../utils/constants");

const rtpService = {};

rtpService.findOne = async (criteria, options) => await rtpModel.findOne(criteria);
rtpService.create = async (payload) => await rtpModel.create(payload);

module.exports = rtpService;
