const router = require("express").Router();

const {
  InviteUser,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  UpdateUser,
  AuthorizeUserPin,
  AuthorizeUserFinger,
} = require("../controllers/auth");

//invite user
router.post("/invite", InviteUser);
router.post("/register", Register);
router.post("/login", Login);
router.post("/forgot", ForgotPassword);
router.patch("/reset", ResetPassword);
router.patch("/update/:userId", UpdateUser);
router.post("/authorize/pin", AuthorizeUserPin);
router.post("/authorize/finger", AuthorizeUserFinger);

module.exports = router;
