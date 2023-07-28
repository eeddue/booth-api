const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema(
  {
    code: String,
    owner: String,
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", CodeSchema);
module.exports = Code;
