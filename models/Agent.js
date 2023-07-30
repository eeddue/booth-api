const mongoose = require("mongoose");
require("@mongoosejs/double");

const AgentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: { type: String, required: true },
    balance: {
      type: mongoose.Schema.Types.Double,
      default: 0,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 16,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", AgentSchema);
module.exports = Agent;
