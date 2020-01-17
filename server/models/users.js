const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
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
