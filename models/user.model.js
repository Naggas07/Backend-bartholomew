const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const bcrypt = require("bcrypt");

const SALT_FACTOR = 11;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowecase: true,
    },
    lastname1: {
      type: String,
    },
    lastname2: {
      type: String,
    },
    user: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [3, "La contraseña debe tener al menos 3 caracteres"],
    },
    email: {
      type: String,
      required: true,
      match: [EMAIL_PATTERN, "El email debe ter un formato válido"],
    },
    avatar: {
      type: String,
      default: "url",
    },
    state: {
      type: String,
      required: true,
      enum: ["Active", "Pending", "Banned"],
    },
  },
  {
    timestamp: true,
    ToJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret.id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt
      .genSalt(SALTFACTOR)
      .then((salt) => {
        return bcrypt.hash(user.password, salt).then((hash) => {
          user.password = hash;
          next();
        });
      })
      .catch(next);
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.Model(UserSchema, "User");

module.exports = User;
