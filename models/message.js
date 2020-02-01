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
  member: {
    type: Schema.Types.ObjectID,
    ref: "Member",
  },
  channel: {
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

module.exports = mongoose.model("Message", messageSchema);