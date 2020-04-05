const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    depImage: {
      type: String,
      default: "image",
    },
    state: {
      type: String,
      required: true,
      enum: ["Active", "Deprecated"],
    },
    roles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Rol",
    },
    userCreate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
