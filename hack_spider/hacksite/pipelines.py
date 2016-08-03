# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import pymongo
from scrapy.conf import settings


class HacksitePipeline(object):
    def __init__(self):
        conn = pymongo.MongoClient('localhost', 27017)
        db = conn.hack_db
        #self.connection = db[settings['MONGODB_CONNECTION']]
        self.connection = db.hack_site

    def process_item(self, item, spider):
        self.connection.insert(dict(item))
