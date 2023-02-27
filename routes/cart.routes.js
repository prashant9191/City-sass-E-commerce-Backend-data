const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cart_dataRouter = express.Router();
const { cartModel } = require("../model/products_model");
require("dotenv").config();
app.use(express.json());

cart_dataRouter.get("/", async (req, res) => {
  const token=req.headers.authorization
  if(token){
      jwt.verify(token,process.env.secreateKey,async(err,decoded)=>{
          if(decoded){
  const cartdata= await cartModel.find({owner:decoded.User})
  res.send(cartdata)
          }else{
              res.send({msg:"wrong token"})
          }
      })
  }else{
      res.send("Please login first")
  }
});
cart_dataRouter.post("/create", async (req, res) => {
  try {
    let {title}=req.body;
    const product = await cartModel.find({title:title});
    if(product.length>=1){
      res.send({ msg: "Product is already in  the Cart" });
    }
    const payloade = req.body;
    if (Array.isArray(payloade)) {
      for (let el of payloade) {
        const newproduct = await cartModel(el);
        newproduct.save();
      }
    } else {
      const newproduct = await cartModel(payloade);
      newproduct.save();
    }

    res.send({ msg: "New product added to cart" });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
cart_dataRouter.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const paylode= req.body;
    await cartModel.findByIdAndUpdate(id, paylode);
    res.send({ msg: `Product with id:${id} has been updated` ,paylode });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
cart_dataRouter.delete("/delete/:id", async (req, res) => {
  const proid = req.params.id;
  await cartModel.findByIdAndDelete({ _id: proid });
  res.send({ msg: `Product  with id:${proid} has been deleted` });
});

module.exports = {
    cart_dataRouter,
};
