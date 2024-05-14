const userModel = require("../Model/UserModel");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken")

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10)

  try {
    const userdata = await userModel.create({
      email: email,
      password: hashedpassword
    })

    res.status(201).json(userdata)
  } catch (err) {
    next(err);
  }
}

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await userModel.findOne({ email })
    if (!validUser) return next(errorHandler(404, "User not found!"))
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Password!"))
    const {password: pass, ...rest} = validUser._doc;
    
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
    res.cookie('access_token', token, {httpOnly:true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000)})
    .status(200)
    .json(rest);
  } catch (error) {
    next(error)
  }
}

exports.google = async (req, res, next) => {
  try {
    const user = await userModel.findOne({email: req.body.email});
    if(user){
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc;
      res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
        .status(200)
        .json(rest);
    } 

    else{
      const generatPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedpassword = bcryptjs.hashSync(generatPassword,10);
      const newUser = new userModel({email: req.body.email, password: hashedpassword, avatar: req.body.photo}) 
      newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
        .status(200)
        .json(rest);
    }
    
  } catch (error) {
    next(error);
  }
}

exports.signOut = (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json("user has been logOut");
  } catch (error) {
    next(error)
  }
}