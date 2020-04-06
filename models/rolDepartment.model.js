const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolDepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
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

const RolDepartment = mongoose.model("RolDepartment", RolDepartmentSchema);

module.exports = RolDepartment;
