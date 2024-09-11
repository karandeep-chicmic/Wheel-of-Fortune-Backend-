const { createSuccessResponse, createErrorResponse } = require("../helpers");
const { symbolsService } = require("../services");
const { ERROR_TYPES } = require("../utils/constants");
const {
  BAD_REQUEST,
  SYMBOL_UPDATED,
  SYMBOL_DELETED,
  SYMBOL_CREATED,
  SYMBOL_FETCHED,
} = require("../utils/messages");

const createSymbol = async (payload) => {
  const {
    name,
    symbolsType,
    imageUrl,
    description,
    amountPayout,
    probability,
  } = payload;

  const createSymbol = await symbolsService.create({
    name: name,
    symbolsType: symbolsType,
    image: imageUrl,
    description: description,
    amountPayout: amountPayout,
    probability: probability,
  });

  return createSuccessResponse(SYMBOL_CREATED, createSymbol);
};

const deleteSymbol = async (payload) => {
  const { id } = payload;

  const deleteSymbol = await symbolsService.deleteOne({ _id: id });

  if (deleteSymbol) {
    return createSuccessResponse(SYMBOL_DELETED, createSymbol);
  } else {
    return createErrorResponse(BAD_REQUEST, ERROR_TYPES.BAD_REQUEST, {});
  }
};

const updateSymbol = async (payload) => {
  const {
    id,
    name,
    symbolsType,
    imageUrl,
    description,
    amountPayout,
    probability,
  } = payload;

  const updateSymbol = await symbolsService.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
        symbolsType: symbolsType,
        image: imageUrl,
        description: description,
        amountPayout: amountPayout,
        probability: probability,
      },
    },
    { new: true }
  );

  if (updateSymbol) {
    return createSuccessResponse(SYMBOL_UPDATED, updateSymbol);
  } else {
    return createErrorResponse(BAD_REQUEST, ERROR_TYPES.BAD_REQUEST, {});
  }
};

const findSymbols = async (payload) => {
  const { id } = payload;

  const findSymbols = await symbolsService.findOne({ _id: id });

  if (findSymbols) {
    return createSuccessResponse(SYMBOL_FETCHED, findSymbols);
  } else {
    return createErrorResponse(BAD_REQUEST, ERROR_TYPES.BAD_REQUEST, {});
  }
};

module.exports = { createSymbol, deleteSymbol, updateSymbol ,findSymbols};
