const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inviteSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true
    },
    subject: {
      type: Schema.Types.ObjectID,
      ref: "Orchestra",
      required: true
    },
    from: {
      type: Schema.Types.ObjectID,
      ref: "User",
      required: true
    },
    to: {
      type: Schema.Types.ObjectID,
      ref: "User",
      required: false
    },
    pending: {
      type: Schema.Types.Boolean,
      required: true,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invite", inviteSchema);
