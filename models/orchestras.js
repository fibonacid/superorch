const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orchestraSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectID,
    ref: "User"
  },
  members: [
    {
      type: Schema.Types.ObjectID,
      ref: "User"
    }
  ],
  channels: [
    {
      type: Schema.Types.ObjectID,
      ref: "Channel"
    }
  ]
});

module.exports = mongoose.model("Orchestra", orchestraSchema);
