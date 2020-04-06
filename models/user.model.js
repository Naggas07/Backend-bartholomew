const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const SALTFACTOR = 11;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowecase: true,
    },
    lastName1: {
      type: String,
    },
    lastName2: {
      type: String,
    },
    nickName: {
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
      enum: ["Active", "Pending", "Banned"],
      default: "Pending",
    },
    userType: {
      type: String,
      enum: ["Admin", "User", "Super"],
      default: "User",
    },
    rol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    departmentRol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
    },
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
    },
    squadRol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc.id;
        delete ret._id;
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

userSchema.pre("findOneAndUpdate", async function () {
  console.log(this._update);
  this._update.password = await bcrypt.hash(this._update.password, SALTFACTOR);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
