const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema(
  {
    code: Number,
    owner: String
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", CodeSchema);
module.exports = Code;
