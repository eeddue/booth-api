const router = require("express").Router();
const { Compare } = require("../helpers/Bcrypt");
const CheckExpired = require("../helpers/CheckExpired");
const Code = require("../models/Code");

router.post("/verify", async (req, res) => {
  const { email, code: bodyCode } = req.body;
  try {
    const code = await Code.findOne({ owner: email });
    if (!code) return;

    //compare user code and db code
    if (!Compare(code.code, bodyCode))
      return res
        .status(400)
        .json({ msg: "Wrong code. Enter the code we sent to your email." });

    //check if code is expired
    if (CheckExpired()) {
      await Code.deleteMany({ owner: email });
      return res.status(400).json({ msg: "The code has already expred." });
    }

    await Code.deleteMany({ owner: email });
    return res.status(200).json({ msg: "Email has been verified." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
