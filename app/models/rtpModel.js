"use strict";

/** *********** Modules ********** */
const MONGOOSE = require("mongoose");

const { Schema } = MONGOOSE;

/** *********** RTP Model ********** */
const rtpSchema = new Schema(
  {
    totalSpins: { type: String, required: true, default: 0 },
    winingProbability: { type: Number, required: true, default: 0 },
    betLimitation: { type: Number, required: true },
    rtpPercentage: { type: Number, required: true },
    rtpCheck: { type: Boolean, default: false, required: true },
    userId: {
      type: MONGOOSE.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true, versionKey: false, collection: "rtp" }
);

module.exports = MONGOOSE.model("rtp", rtpSchema);
