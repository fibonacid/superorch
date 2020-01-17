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
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  birthdate: {
    type: Date,
    required: false
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
