const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  orchestra: {
    type: Schema.Types.ObjectID,
    ref: "Orchestra",
    required: true
  },
  from: {
    type: Schema.Types.ObjectID,
    ref: "Member",
    required: true
  },
  toMember: {
    type: Schema.Types.ObjectID,
    ref: "Member",
  },
  toChannel: {
    type: Schema.Types.ObjectID,
    ref: "Channel",
  },
  context: {
    type: Schema.Types.String,
    required: true,
    enum: ["CHAT", "SUPERCOLLIDER"]
  },
  format: {
    type: Schema.Types.String,
    enum: ["PLAIN_TEXT", "JSON", "SC_RAW", "SC_LANG"],
    default: "PLAIN_TEXT"
  }
});

module.exports = mongoose.model("Channel", messageSchema);