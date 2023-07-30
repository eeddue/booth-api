const mongoose = require("mongoose");
require("@mongoosejs/double");

const TransactionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    amount: mongoose.Schema.Types.ObjectId,
    fees: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
