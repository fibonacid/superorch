const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: false,
    default: "anonymous"
  },
  createdOrchestras: [
    {
      type: Schema.Types.ObjectID,
      ref: "Orchestra"
    }
  ],
  memberOf: [
    {
      type: Schema.Types.ObjectID,
      ref: "Orchestra"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
