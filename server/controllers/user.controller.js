const residencyModel = require("../Model/RecidencyModel.js");
const userModel = require("../Model/UserModel.js");
const { errorHandler } = require("../utils/error.js");


exports.signin = async (req, res) => {
  try {
    const showAll = await userModel.find();
    res.status(200).json(showAll);
  }
  catch (err) {
    res.status(500).json({ err: err.message })
  }
};  