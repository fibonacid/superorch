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
  }
});

module.exports = mongoose.model("Orchestra", orchestraSchema);
