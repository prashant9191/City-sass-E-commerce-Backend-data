const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const womenTshirtRouter = express.Router();
const { womenTshirtModel } = require("../model/products_model");

app.use(express.json());

womenTshirtRouter.get("/", async (req, res) => {
  // const token=req.headers.authorization
  const id = req.params.id;
  if (id) {
    const women = await womenTshirtModel.find();
    res.send(women);
  } else {
    const women = await womenTshirtModel.find();
    res.send(women);
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
womenTshirtRouter.post("/create", async (req, res) => {
  try {
    const payloade = req.body;
    if (Array.isArray(payloade)) {
      for (let el of payloade) {
        const women = await womenTshirtModel(el);
        women.save();
      }
    } else {
      const women = await womenTshirtModel(payloade);
      women.save();
    }

    res.send({ msg: "New product added to women section" });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
womenTshirtRouter.patch("/update/:id", async (req, res) => {
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
    await womenTshirtModel.findByIdAndUpdate(id, updateObj);
    res.send({ msg: `Product with id:${id} has been updated` });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
womenTshirtRouter.delete("/delete/:id", async (req, res) => {
  const proid = req.params.id;
  await womenTshirtModel.findByIdAndDelete({ _id: proid });
  res.send({ msg: `Product with id:${proid} has been deleted` });
});

module.exports = {
  womenTshirtRouter,
};
