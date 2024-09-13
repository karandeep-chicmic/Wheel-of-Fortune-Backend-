"use strict";

/** *********** Modules ********** */
const MONGOOSE = require("mongoose");

const { Schema } = MONGOOSE;

/** *********** Game Model ********** */
const gameSchema = new Schema(
  {
    winLossStatus: { type: String, required: true, default: 0 },
    outcome: { type: Array, required: true },
    betAmount: { type: Number, required: true },
    winningAmount: { type: Number, required: true },
    userId: {
      type: MONGOOSE.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true, versionKey: false, collection: "game" }
);

module.exports = MONGOOSE.model("game", gameSchema);
