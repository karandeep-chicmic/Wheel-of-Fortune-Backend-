const { rtpModel } = require("../models");
const { NORMAL_PROJECTION } = require("../utils/constants");

const rtpService = {};

rtpService.findOne = async (criteria, options) =>
  await rtpModel.findOne(criteria);
rtpService.create = async (payload) => await rtpModel.create(payload);
rtpService.updateOne = async (criteria, toUpdate) =>
  await rtpModel.updateOne(criteria, toUpdate);

module.exports = rtpService;
