const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");

const userRoutes = express.Router();

// to register admin
userRoutes.post("/register", async (req, res) => {
  const { email,password } = req.body;
  const user1 = await UserModel.findOne({ email });
  console.log(user1);
  if(user1?.email.length>0) {
    res.status(200).send({ msg:'User Already Exist', status:'error' });

  } else {

    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ err: err.message });
        }
  
        const user = new UserModel({ ...req.body, password: hash });
        await user.save();
        res.status(200).send({ msg: "User Registered" });
      });
    } catch (error) {
      res.status(400).send({ err: error.message });
    }
  }
});

// to login user

userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user1 = await UserModel.findOne({ email });
    console.log(user1);
    if (user1?.email) {
      bcrypt.compare(password, user1.password, async (err, result) => {
        if (err) {
          res.status(400).send({ err: err.message, status:'error' });
        }
        if (result) {
          const token = jwt.sign(
            { userID: user1._id, username: user1.name },
            "rahul"
          );
          res.status(200).send({ msg: "Login Successfull", token, status:'success', userID: user1._id});
        } else {
          res.status(200).send({ msg: "Wrong Credentials",  status:'error' });

        }  
      });
    } else {
      res.status(200).send({ msg: "User not Found",status:'error' });
    }
  } catch (error) {
    res.status(400).send({ err: error.message, status:'error' });
  }
});

module.exports = {
  userRoutes,
};
