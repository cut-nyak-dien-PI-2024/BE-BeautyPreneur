const MakeupBudget = require("../models/MakeupBudget");

const processData = async (data) => {
  const products = await MakeupBudget.find({});
  const targetTotal = data;
  let result = [];
  let closestTotal = 0;

  function findCombination(index, currentCombination, currentTotal) {
    if (currentTotal > closestTotal && currentTotal <= targetTotal) {
      closestTotal = currentTotal;
      result = [...currentCombination];
    }

    if (currentTotal >= targetTotal) return;

    for (let i = index; i < products.length; i++) {
      findCombination(
        i + 1,
        [...currentCombination, products[i]],
        currentTotal + products[i].price
      );
    }
  }

  findCombination(0, [], 0);
  return result;
};

module.exports = { processData };
