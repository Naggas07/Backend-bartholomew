const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Rol = mongoose.model("Rol", RolSchema);

module.exports = Rol;
