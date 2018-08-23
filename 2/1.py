#!/usr/bin/env python
import pymongo

# It is not necessary to import sys

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")


db = connection.students
grades = db.grades


def find():

    query = {'type': 'exam', 'score': {'$gte': 65}}

    try:
        cursor = db.grades.find(query)
        cursor.sort([('score', pymongo.ASCENDING)])

    except Exception as e:
        print "Unexpected error:", type(e), e

    sanity = 0
    for doc in cursor:
        print doc
        sanity += 1
        if (sanity > 5):
            break



if __name__ == '__main__':
    find()  # Change this to find_one() to run that function, instead.
