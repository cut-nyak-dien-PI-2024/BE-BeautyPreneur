const mongoose = require("mongoose");

const makeupBudgetSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  product_link: {
    type: String,
    required: true
  },
});

const MakeupBudget = mongoose.model("makeupBudget", makeupBudgetSchema);
module.exports = MakeupBudget;