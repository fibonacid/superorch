const validateToken = require("../helpers/auth");

module.exports = (req, res, next) => {
  res.locals = {};

  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.locals.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    res.locals.isAuth = false;
    return next();
  }

  validateToken(token)
    .then(data => {
      res.locals.isAuth = true;
      res.locals.userId = data.userId;
    })
    .catch(err => {
      console.log(err);
      res.locals.isAuth = false;
      return next();
    });

  next();
};
