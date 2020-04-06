const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolSquadSchema = new Schema(
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
    squad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Squad",
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

const RolSquad = mongoose.model("RolSquad", RolSquadSchema);

module.exports = RolSquad;
