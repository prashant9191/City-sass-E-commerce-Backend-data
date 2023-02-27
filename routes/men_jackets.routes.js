const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const men_jacketsRouter = express.Router();
const { men_jacketsModel } = require("../model/products_model");

app.use(express.json());

men_jacketsRouter.get("/", async (req, res) => {
  const id = req.params.id;
  if (id) {
    const men_jackets = await men_jacketsModel.find();
    res.send(men_jackets);
  } else {
    const men_jackets = await men_jacketsModel.find();
    res.send(men_jackets);
  }
});
men_jacketsRouter.post("/create", async (req, res) => {
  try {
    const payloade = req.body;
    if (Array.isArray(payloade)) {
      for (let el of payloade) {
        const newjacket = await men_jacketsModel(el);
        newjacket.save();
      }
    } else {
      const newjacket = await men_jacketsModel(payloade);
      newjacket.save();
    }

    res.send({ msg: "New Product added into Men's Jacket Category" });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
men_jacketsRouter.patch("/update/:id", async (req, res) => {
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
    await men_jacketsModel.findByIdAndUpdate(id, updateObj);
    res.send({ msg: `Product with id:${id} has been updated` });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
men_jacketsRouter.delete("/delete/:id", async (req, res) => {
  const proid = req.params.id;
  await men_jacketsModel.findByIdAndDelete({ _id: proid });
  res.send({ msg: `Product with id:${proid} has been deleted` });
});

module.exports = {
  men_jacketsRouter,
};
