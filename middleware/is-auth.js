const { validateToken } = require('../helpers/auth');

module.exports = (req, res, next) => {
  console.log('Authenticating ...');
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
  let decodedToken;
  try {
    decodedToken = validateToken(token);
  } catch (err) {
    console.log(err);
    res.locals.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    res.locals.isAuth = false;
    return next();
  }
  console.log('Authenticated !');

  res.locals.isAuth = true;
  res.locals.userId = decodedToken.userId;
  next();
};
