const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const channelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  orchestra: {
    type: Schema.Types.ObjectID,
    ref: "Orchestra",
    required: true
  },
  members: [
    {
      type: Schema.Types.ObjectID,
      ref: "Member"
    }
  ]
});

module.exports = mongoose.model("Channel", channelSchema);
