const jwt = require("jsonwebtoken");

function validateToken(token) {
  return new Promise((resolve, reject) => {
    const decodedToken = jwt.verify(token, "somesupersecretkey");
    if (decodedToken) {
      resolve(decodedToken);
    } else {
      reject("Invalid auth token");
    }
  });
}

module.exports = validateToken;
