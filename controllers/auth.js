const { Encrypt, Compare } = require("../helpers/Bcrypt");
const GenarateCode = require("../helpers/GenerateCode");
const { CreateToken, CreateCodeToken } = require("../helpers/Jwt");
const SendMail = require("../helpers/SendMail");
const Code = require("../models/Code");
const User = require("../models/User");

const InviteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ msg: "This email has been already taken." });

    //create code and send it to user email
    const code = GenarateCode();
    await Code.deleteMany({ owner: email });
    await Code.create({
      code: CreateCodeToken({ code, expiresAt: Date.now() + 1800000, email }),
      owner: email,
    });
    await SendMail(
      email,
      "Verify your email.",
      `Use this invitation code to verify your email. ${code} \n This code will expire in 30 minutes.`
    );

    return res.status(200).json({ msg: "Check your email." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const Register = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    avatar,
    password,
    country,
    pin,
  } = req.body;
  try {
    if (
      !first_name ||
      !last_name ||
      !username ||
      !email ||
      !avatar ||
      !password ||
      !country ||
      !pin
    )
      return res.status(400).json({ msg: "All fields are required." });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exists." });

    user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ msg: "This username has already been taken." });

    await User.create({
      ...req.body,
      password: Encrypt(password),
      pin: Encrypt(pin),
    });

    await SendMail(
      email,
      "Welcome to BOOTH",
      "Send, receive and withdraw money anywhere around the world. Continue to login."
    );

    return res
      .status(200)
      .json({ msg: "You are now a member. Continue to login." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.sendStatus(404);

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials." });

    if (!Compare(password, user.password))
      return res.status(400).json({ msg: "Invalid credentials." });

    //return userId and jwt token
    const token = CreateToken(user._id, "1w");
    return res.status(200).json({ token, userId: user._id });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        msg: "Email doesn't exist. Enter the email associated with your account.",
      });

    const code = GenarateCode();
    await Code.deleteMany({ owner: email });
    await Code.create({
      code: CreateCodeToken({ code, expiresAt: Date.now() + 1800000, email }),
      owner: email,
    });
    await SendMail(
      email,
      "Verify it's you.",
      `Use this to reset your password. ${code} \n This code will expire in 30 minutes. \n If you didn't request for this code, ignore the message, your account is safe.`
    );

    return res.status(200).json({ msg: "Check your email." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const ResetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "No account found" });

    await User.findOneAndUpdate({ email }, { password: Encrypt(password) });
    return res
      .status(200)
      .json({ msg: "Password reset was successful. Continue to login." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const UpdateUser = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  try {
    if (data.pin) {
      data.pin = Encrypt(data.pin);
    }
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    return res.status(200).json({ msg: "Profile updated.", user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const AuthorizeUserPin = async (req, res) => {
  const { userId, pin: userPin } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found." });

    if (!Compare(userPin, user.pin))
      return res.status(400).json({ msg: "Wrong pin. Try again." });

    const { pin, password, ...others } = user._doc;
    const token = CreateToken(user._id, "15m");
    return res
      .status(200)
      .json({ msg: "Logged in successfully", user: others, token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const AuthorizeUserFinger = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found." });

    const { pin, password, ...others } = user._doc;
    const token = CreateToken(user._id, "15m");
    return res
      .status(200)
      .json({ msg: "Logged in successfully", user: others, token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  InviteUser,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  UpdateUser,
  AuthorizeUserPin,
  AuthorizeUserFinger,
};
