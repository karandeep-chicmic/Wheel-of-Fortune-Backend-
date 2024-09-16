const { wheelModel } = require("../models");
const { NORMAL_PROJECTION } = require("../utils/constants");

const wheelService = {};

wheelService.create = async (payload) => await wheelModel.create(payload);
wheelService.findById = async (id) => await wheelModel.findById(id).lean();
wheelService.update = async (criteria, dataToUpdate, options = { new: true }) =>
  await wheelModel.findOneAndUpdate(criteria, dataToUpdate, options).lean();

wheelService.findWithPaging = async (criteria, index, limit) =>
  wheelModel.find(criteria).skip(index).limit(limit).sort({ createdAt: -1 });

module.exports = wheelService;
