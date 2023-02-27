const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const men_shooseRouter = express.Router();
const { men_ShooseModel } = require("../model/products_model");

app.use(express.json());

men_shooseRouter.get("/", async (req, res) => {

  const id = req.params.id;
  if (id) {
    const men_shoose = await men_ShooseModel.find();
    res.send(men_shoose);
  } else {
    const men_shoose = await men_ShooseModel.find();
    res.send(men_shoose);
  }

});
men_shooseRouter.post("/create", async (req, res) => {
  try {
    const payloade = req.body;
    if (Array.isArray(payloade)) {
      for (let el of payloade) {
        const menshoose = await men_ShooseModel(el);
        menshoose.save();
      }
    } else {
      const menshoose = await men_ShooseModel(payloade);
      menshoose.save();
    }

    res.send({ msg: "Product add to Shoose Category " });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
men_shooseRouter.patch("/update/:id", async (req, res) => {
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
    await men_ShooseModel.findByIdAndUpdate(id, updateObj);
    res.send({ msg: `Product with id:${id} has been updated` });
  } catch (error) {
    res.send({ msg: "something went wrong", error: error.message });
  }
});
men_shooseRouter.delete("/delete/:id", async (req, res) => {
  const proid = req.params.id;
  await men_ShooseModel.findByIdAndDelete({ _id: proid });
  res.send({ msg: `Product with id:${proid} has been deleted` });
});

module.exports = {
  men_shooseRouter,
};
