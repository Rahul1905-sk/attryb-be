const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      console.log(token);

      var decoded = jwt.verify(token.split(" ")[1], "rahul");
      // console.log({ decoded });

      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.username = decoded.username;
        next()
      }else {
        res.status(200).send({ msg: "Something went wrong" });
      }
    } else {
      res.status(200).send({ msg: "Login First" });
      
    }
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
};


module.exports = {auth}