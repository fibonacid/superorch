const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  user: {
    type: Schema.Types.ObjectID,
    ref: "User"
  },
  orchestra: {
    type: Schema.Types.ObjectID,
    ref: "Orchestra"
  },
  active: {
    type: Boolean,
    deafult: true
  }
});

module.exports = mongoose.model("Member", memberSchema);
