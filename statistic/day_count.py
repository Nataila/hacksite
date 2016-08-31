#!/usr/bin/env python
# coding: utf-8
# Nataila @ 2016-08-31

import pymongo

conn = pymongo.MongoClient('127.0.0.1')
db = conn['hack_db']


def main():
    time_line = db.hack_site.find().distinct('time')
    for i in time_line:
        count = db.hack_site.find({'time': i}).count()
        db.day_count.insert({'time': i, 'count': count})

if __name__ == '__main__':
    main()
