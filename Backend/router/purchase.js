const express = require("express");
const app = express();
const purchase = require("../controller/purchase");

// Add Purchase
app.post("/add", purchase.addPurchase);

// Get All Purchase Data
app.get("/get/:userID", purchase.getPurchaseData);

app.get("/get/:userID/totalpurchaseamount", purchase.getTotalPurchaseAmount);

module.exports = app;

// https://webnox-ims0backend.onrender.com/api/purchase/add POST
// https://webnox-ims0backend.onrender.com/api/purchase/get GET
