const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inviteSchema = new Schema(
  {
    orchestraId: {
      type: Schema.Types.ObjectID,
      ref: "Orchestra",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectID,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invite", inviteSchema);
