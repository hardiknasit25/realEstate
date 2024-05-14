const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../Model/UserModel.js");
const { signin, userproperty } = require("../controllers/user.controller.js");
const router = express.Router();

// router.get("/signin", signin)

//find user
router.get("/signin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userModel.findById({ _id: id });
    res.status(200).json(singleUser);
  }
  catch (err) {
    res.status(500).json({ err: err.message })
  }
})

//delete user
router.delete("/signin/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userModel.findByIdAndDelete({ _id: id });
    res.status(200).json(singleUser);
  }
  catch (err) {
    res.status(500).json({ err: err.message })
  }
})

//Forgot password
router.patch("/signin/:id", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const forgotPassword = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(forgotPassword);
  }
  catch (err) {
    res.status(500).json({ err: err.message })
  }
})

module.exports = router;