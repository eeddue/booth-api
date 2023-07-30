const router = require("express").Router();
const { CheckCodeExpired } = require("../helpers/Jwt");
const Code = require("../models/Code");

router.post("/verify", async (req, res) => {
  const { email, code: bodyCode } = req.body;
  try {
    if (!bodyCode || !email) return res.sendStatus(404);

    const code = await Code.findOne({ owner: email });
    if (!code) return res.status(400).json({ msg: "No code found." });

    //compare user code and db code
    const decoded = CheckCodeExpired(code.code);
    if (decoded.code.toString() !== bodyCode)
      return res
        .status(400)
        .json({ msg: "Wrong code. Enter the code we sent to your email." });

    // check if code is expired
    if (Date.now() - decoded.expiresAt > 1800000) {
      await Code.deleteMany({ owner: email });
      return res
        .status(400)
        .json({ msg: "The code has already expred. Request for a new one." });
    }

    await Code.deleteMany({ owner: email });
    return res.status(200).json({ msg: "Email has been verified." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
