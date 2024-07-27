const express = require("express");
const { main } = require("./models/index");
const productRoute = require("./router/product");
const storeRoute = require("./router/store");
const purchaseRoute = require("./router/purchase");
const salesRoute = require("./router/sales");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/users");
const Product = require("./models/Product");
const authMiddleware = require('./utils/authMiddleware')
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const PORT = process.env.Port || 4000;
const { generateToken, verifyToken } = require("./utils/jwt"); 

main();
app.use(express.json());
app.use(cors());

// Store API
app.use("/api/store", authMiddleware,storeRoute);

// Products API
app.use("/api/product",authMiddleware, productRoute);

// Purchase API
app.use("/api/purchase",authMiddleware, purchaseRoute);

// Sales API
app.use("/api/sales",authMiddleware, salesRoute);

// Signin
let userAuthCheck;

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      userAuthCheck = user;
      const token = generateToken(user);
      res.status(200).json({user,token});
    } else {
      userAuthCheck = null;
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Getting User Details of logged-in user
app.get("/api/login",authMiddleware, (req, res) => {
  if (userAuthCheck) {
    res.status(200).json(userAuthCheck);
  } else {
    res.status(401).json({ message: "User not authenticated" });
  }
});

// Registration API
app.post("/api/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      imageUrl: req.body.imageUrl,
    });

    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Test endpoint
app.get("/testget", async (req, res) => {
  try {
    const result = await Product.findOne({ _id: '6429979b2e5434138eda1564' });
    res.status(200).json(result);
  } catch (error) {
    console.error("Test get error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


