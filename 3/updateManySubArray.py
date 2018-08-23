#!/usr/bin/env python
import pymongo


# It is not necessary to import sys

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")

# get a handle to the school database
db = connection.school
students = db.students

def updateManySubArray():

    cursor = students.find({}, { "scores": "1" }).sort( ([('scores.type', pymongo.ASCENDING),
                         ('scores.score', pymongo.ASCENDING)]) )

    # limit = 0
    for document in cursor:
        print(document["scores"])
        d_list = document["scores"]
        d_list = d_list[:-1]
        document["scores"] = d_list
        students.save(document)

        print(d_list)


        # limit += 1
        # if limit > 2:
        #     break



if __name__ == '__main__':
    updateManySubArray()
