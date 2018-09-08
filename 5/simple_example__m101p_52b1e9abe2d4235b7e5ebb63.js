// use agg
db.products.aggregate([
  {
    $group: {
      _id: "$manufacturer",
      category: { $sum: 1 }
    }
  }
]);

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      num_products: { $sum: 1 }
    }
  }
]);
// sum the pop field, for each state
db.zips.aggregate([
  {
    $group: {
      _id: "$state",
      population: { $sum: "$pop" }
    }
  }
]);
