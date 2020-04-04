const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const UserSchema = new Schema(
  {
    name,
    lastname1,
    lastname2,
    user,
    password,
    email,
    type,
    state
  },
  {
    timestamp: true
  }
);

const User = mongoose.Model(UserSchema, "User");

module.exports = User;
