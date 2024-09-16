const { wheelModel } = require("../models");
const { NORMAL_PROJECTION } = require("../utils/constants");

const wheelService = {};

wheelService.create = async (payload) => await wheelModel.create(payload);
wheelService.findById = async (id) => await wheelModel.findById(id).lean();
wheelService.update = async (criteria, dataToUpdate, options = { new: true }) =>
  await wheelModel.findOneAndUpdate(criteria, dataToUpdate, options).lean();

wheelService.findWithPaging = async (criteria, index, limit) =>
  wheelModel.find(criteria).skip(index).limit(limit).sort({ createdAt: -1 });

wheelService.aggregateWithSymbols = async (id) =>
  await wheelModel.aggregate([
    {
      $match: {
        $expr: {
          $eq: ["$_id", id],
        },
      },
    },
    {
      $unwind: {
        path: "$symbols",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "symbols",
        let: { symbolArray: "$symbols" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$symbolArray"] },
            },
          },
        ],
        as: "symbolDetails",
      },
    },
    {
      $group: {
        _id: "$_id",
        symbols: { $push: "$symbolDetails" },
        accessType: { $first: "$accessType" },
        deleted: { $first: "$deleted" },
        createdBy: { $first: "$createdBy" },
        wheelName: { $first: "$wheelName" },
        description: { $first: "$description" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
      },
    },
    
  ]);

module.exports = wheelService;
