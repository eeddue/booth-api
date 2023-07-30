const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    owner: { type: String, required: true },
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", CodeSchema);
module.exports = Code;
