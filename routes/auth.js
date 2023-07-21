const router = require("express").Router();

const {
  InviteUser,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  UpdateUser,
} = require("../controllers/auth");

//invite user
router.post("/invite", InviteUser);
router.post("/register", Register);
router.post("/login", Login);
router.post("/forgot", ForgotPassword);
router.patch("/reset", ResetPassword);
router.patch("/update/:userId", UpdateUser);

module.exports = router;
