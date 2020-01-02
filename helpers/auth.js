const jwt = require("jsonwebtoken");

exports.validateToken = function(token) {
  return jwt.verify(token, "somesupersecretkey");
}