const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const verifyToken = require('./middlewares/authMiddleware'); 
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
app.use(cors());

app.use(express.json());
// authRoutes

app.use("/api/auth", authRoutes)
// categoryRoutes
app.use("/api/categories", verifyToken,categoryRoutes);

//  CONNECTION URL 
const mongoUrl = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err  =>  console.error("Error connecting  to MongoDB:", err));


// server

app.listen(3000, () => {

console.log(`Server is running on ${port}`)

});