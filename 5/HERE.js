// Grouping compares the values that are inside that group

// use agg

db.messages.aggregate([
    {
        $group: {
            // _id = what you search on
            _id: '$manufacturer',
            category: { $sum: 1 }
        }
    }
]);

db.products.aggregate([
    {
        $group: {
            _id: '$category',
            num_products: { $sum: 1 }
        }
    }
]);
// sum the pop field, for each state
db.zips.aggregate([
    {
        $group: {
            _id: '$state',
            population: { $sum: '$pop' }
        }
    }
]);
// avg population
db.zips.aggregate([
    {
        $group: {
            _id: '$state',
            average_pop: { $avg: '$pop' }
        }
    }
]);
// addToSet, only adds if it's not already there
db.zips.aggregate([
    {
        $group: {
            _id: '$city',
            postal_codes: { $addToSet: '$_id' }
        }
    }
]);
// find the max population for state
db.zips.aggregate([
    {
        $group: {
            _id: '$state',
            pop: { $max: '$pop' }
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
            city: { $toLower: '$city' },
            zip: '$_id'
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

// $first and $last are used after a sort phase
// unwind brakes up an array into multiple documents with the remainder of the not unwinded part
// aggregation options: explain, allowDiskUse
// cursor={} returns a cursor from aggregation

// limitations for aggergate: 100mb memory limit for the pipeline, use "allowDiskUse"
// 16mb limit per document in python, use "cursor"

db.posts.aggregate([
    {
        $unwind: '$comments'
    },
    {
        $group: {
            _id: '$comments.author',
            numberOfComments: { $sum: 1 }
        }
    },
    {
        $sort: { numberOfComments: -1 }
    }
]);

db.zips.aggregate([
    {
        $match: {
            pop: { $gt: 25000 },
            state: { $in: ['CA', 'NY'] }
        }
    },
    {
        $group: {
            _id: null,
            avg: { $avg: '$pop' }
        }
    }
]);

//   _id: { class_id: "$class_id", student_id: "$student_id" },
db.grades.aggregate([
    { $unwind: '$scores' },
    { $match: { 'scores.type': { $ne: 'quiz' } } },
    {
        $group: {
            _id: {
                class_id: '$class_id',
                student_id: '$student_id'
            },
            avg_per_student: { $avg: '$scores.score' }
        }
    },
    {
        $group: {
            _id: '$_id.class_id',
            avg: { $avg: '$avg_per_student' }
        }
    },
    {
        $sort: { avg: -1 }
    }
]);

db.zips.aggregate([
    {
        $project: {
            first_char: { $substr: ['$city', 0, 1] },
            pop: 1
        }
    },
    { $match: { first_char: { $in: ['B', 'D', 'O', 'G', 'N', 'M'] } } },
    {
        $group: {
            _id: '',
            sum: { $sum: '$pop' }
        }
    }
]);

db.messages.aggregate([
    { $unwind: '$headers.To' },
    {
        $group: {
            _id: '$headers.From',
            To: { $addToSet: '$headers.To' }
        }
    },
    {
        $project: { 'from': '$_id', to: 1 , _id: 0}
    }
]);

db.messages.aggregate([
    {
        $unwind: '$headers.To'
    }
]);
