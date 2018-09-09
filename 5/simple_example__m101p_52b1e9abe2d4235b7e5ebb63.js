// Grouping compares the values that are inside that group

// use agg
db.products.aggregate([
  {
    $group: {
      // _id = what you search on
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
// avg population
db.zips.aggregate([
  {
    $group: {
      _id: "$state",
      average_pop: { $avg: "$pop" }
    }
  }
]);
// addToSet, only adds if it's not already there
db.zips.aggregate([
  {
    $group: {
      _id: "$city",
      postal_codes: { $addToSet: "$_id" }
    }
  }
]);
// find the max population for state
db.zips.aggregate([
  {
    $group: {
      _id: "$state",
      pop: { $max: "$pop" }
    }
  }
]);

// projecting is when you change the data in the pipline
// remove the id field, keep pop and state, city to lowercase, zip === _id
db.zips.aggregate([
  {
    $project: {
      _id: 0,
      pop: 1,
      state: 1,
      city: { $toLower: "$city" },
      zip: "$_id"
    }
  }
]);

// match filters the results, pushes it through if the values match
db.zips.aggregate([
  {
    $match: {
      pop: { $gt: 100000 }
    }
  }
]);

db.zips.aggregate([
  {
    $sort: { state: 1, city: 1 }
  }
]);
