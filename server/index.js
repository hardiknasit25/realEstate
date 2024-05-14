const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoute");
const residencyRoute = require("./Routes/ResidencyRoute")
const authRouter = require("./Routes/auth.route")
const cookieParser = require('cookie-parser');

const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

mongoose.connect("mongodb+srv://hardiknasit670:hardiknasitdatabase@cluster0.rdpjxzg.mongodb.net/RealEstate");

app.listen(4000, () => {
  console.log("Server is Runnning...");
})

app.use(userRoute);
app.use(residencyRoute)
app.use(authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Inrernal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})