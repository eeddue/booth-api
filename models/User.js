const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 16,
    },
    email: { type: String, unique: true, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    id_no: Number,
    balance: { type: Number, default: 0 },
    agents: [{ type: mongoose.Schema.Types.ObjectId, ref: "agent" }],
    businesses: [{ type: mongoose.Schema.Types.ObjectId, ref: "business" }],
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    password: { type: String, required: true },
    avatar: String,
    country: { name: String, code: Number, currency: String },
    pin: String,
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
