const Store = require("../models/store");

// Add Store

const addStore = async (req, res) => {
  try {
  
    const newStore = new Store({
      userID: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      address: req.body.address,
      city: req.body.city,
   
    });
    console.log(newStore)
    const savedStore = await newStore.save();
    res.status(200).json(savedStore);
  } catch (err) {
    console.error('Error adding store:', err);
    res.status(500).json({ error: 'Failed to add store', details: err.message });
  }
};

// Get All Stores
const getAllStores = async (req, res) => {
  try {
    const findAllStores = await Store.find({ userID: req.params.userID }).sort({ _id: -1 }); // -1 for descending order
    res.status(200).json(findAllStores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stores', error });
  }
};


module.exports = { addStore, getAllStores };