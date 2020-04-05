const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SquadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
      default: "Active",
    },
    roles: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Rol",
    },
    objetive: {
      type: String,
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

const Squad = mongoose.model("Squad", SquadSchema);

module.exports = Squad;
