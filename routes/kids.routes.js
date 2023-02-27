const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const kidsJacketsRouter = express.Router();
const { kidsJacketsModel } = require("../model/products_model");

app.use(express.json());

kidsJacketsRouter.get("/", async (req, res) => {
  // const token=req.headers.authorization
  const id = req.params.id;
  if (id) {
    const men_jackets = await kidsJacketsModel.find();
    res.send(men_jackets);
  } else {
    const men_jackets = await kidsJacketsModel.find();
    res.send(men_jackets);
  }
  // if(token){
  //     jwt.verify(token,"hell",async(err,decoded)=>{
  //         if(decoded){
  // const men_jackets= await men_jacketsModel.find({_id:id})
  // res.send(men_jackets)
  //         }else{
  //             res.send({msg:"wrong token"})
  //         }
  //     })
  // }else{
  //     res.send("Please login first")
  // }
});
kidsJacketsRouter.post("/create", async (req, res) => {
  try {
    const payloade = req.body;
    if (Array.isArray(payloade)) {
      for (let el of payloade) {
        const newproduct = await kidsJacketsModel(el);
        newproduct.save();
      }
    } else {
      const newproduct = await kidsJacketsModel(payloade);
      newproduct.save();
    }

    res.send({ msg: "New Product added To Kid's Collection" });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
kidsJacketsRouter.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { img, title, price, details, listpoints, fabric } = req.body;
    const updateObj = {};
    if (img.length != 0) updateObj.img = img;
    if (title) updateObj.title = title;
    if (price.length != 0) updateObj.price = price;
    if (details[0].length != 0) updateObj.details = details;
    if (listpoints[0].length != 0) updateObj.listpoints = listpoints;
    if (fabric[0].length != 0) updateObj.fabric = fabric;
    await kidsJacketsModel.findByIdAndUpdate(id, updateObj);
    res.send({ msg: `Product with id:${id} has been updated` });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
kidsJacketsRouter.delete("/delete/:id", async (req, res) => {
  const proid = req.params.id;
  await kidsJacketsModel.findByIdAndDelete({ _id: proid });
  res.send({ msg: `Product with id:${proid} has been deleted` });
});

module.exports = {
  kidsJacketsRouter,
};
