#!/usr/bin/env python
import pymongo

# It is not necessary to import sys

# establish a connection to the database
connection = pymongo.MongoClient("mongodb://localhost")


db = connection.students
grades = db.grades


def find():

    print "find(), reporting for duty"

    query = {'type': 'homework'}

    try:
        cursor = db.grades.find(query)
        cursor.sort([('student_id', pymongo.ASCENDING),
                     ('score', pymongo.ASCENDING)])

    except Exception as e:
        print "Unexpected error:", type(e), e

    saved_id = None
    to_be_deleted = []
    for doc in cursor:
        if saved_id != doc['student_id']:
            saved_id = doc['student_id']
            grades.delete_one(doc)
        saved_id = doc['student_id']


    print(grades.count())
    # print(grades.find().sort( { 'score' : -1 } ).skip( 100 ).limit( 1 ))
    # print(grades.find( { }, { 'student_id' : 1, 'type' : 1, 'score' : 1, '_id' : 0 } ).sort( { 'student_id' : 1, 'score' : 1 } ).limit( 5 ))




if __name__ == '__main__':
    find()  # Change this to find_one() to run that function, instead.
