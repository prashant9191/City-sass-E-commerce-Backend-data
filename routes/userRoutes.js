const express = require("express");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const app = express();
app.use(express.json());
require("dotenv").config();
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, address } = req.body;
  try {
    const check = await userModel.find({ email });
    if (check.length === 0) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({
            msg: "something went wrong",
            error: err.message,
            ok: false,
          });
        } else {
          const User = new userModel({
            name,
            email,
            gender,
            password: hash,
            age,
            address,
          });
          await User.save();
          res.send({ msg: "new user had been registered", ok: true });
        }
      });
    } else {
      res.send({ msg: "user already exists", ok: false });
    }
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message, ok: false });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ User: user[0]._id }, process.env.secreateKey);
          res.send({
            msg: "User Logged In Successfully",
            Token: token,
            ok: true,user
          });
        } else {
          res.send({ msg: "Wrong password", ok: false });
        }
      });
    } else {
      res.send({ msg: "Wrong credentials", ok: false });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message, ok: false });
  }
});

userRouter.get("/alluser",async(req,res)=>{
  try {
    const check = await userModel.find();
    res.send(check);
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message, ok: false });
  }
})

module.exports = {
  userRouter,
};
