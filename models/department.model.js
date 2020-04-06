const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("./rolDepartment.model");
require("./user.model");

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
      enum: ["Active", "Inactive"],
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
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

DepartmentSchema.virtual("roles", {
  ref: "RolDepartment",
  localField: "_id",
  foreignField: "department",
  justOne: false,
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
