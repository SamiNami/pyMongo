// use agg
db.products.aggregate([
    {$group:
     {
	 _id:"$manufacturer",
	 category:{$sum:1}
     }
    }
])


db.products.aggregate([
    {$group:
        {
            "_id":"$category",
             "num_products":{"$sum":1}
        }
    }
])
