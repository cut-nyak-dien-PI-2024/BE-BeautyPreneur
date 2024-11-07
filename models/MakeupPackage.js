const mongoose = require("mongoose");

const makeupPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  total_products: {
    type: Number,
    required: true,
  },
  data: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MakeupBudget",
    },
  ],
});

const MakeupPackage = mongoose.model("makeupPackage", makeupPackageSchema);
module.exports = MakeupPackage;
