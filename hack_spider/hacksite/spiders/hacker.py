# -*- coding: utf-8 -*-
import scrapy
from scrapy.http import Request
from hacksite.items import HacksiteItem


class HackerSpider(scrapy.Spider):
    name = "hacker"
    allowed_domains = ["hac-ker.net"]
    start_urls = (
        'http://www.hac-ker.net/',
    )

    def parse(self, response):
        for i in xrange(1, 1962):
            url = 'http://hac-ker.net/?page=%d' % i
            yield Request(url, callback=self.parse_page)

    def parse_page(self, response):
        site_tr = response.xpath('/html/body/div[2]/div[3]/div/table/tr')[1: -1]
        item = HacksiteItem()
        for i in site_tr:
            td = i.xpath('td')
            try:
                item['time'] = td[0].xpath('b/text()').extract_first()
                item['author'] = td[1].xpath('a/text()').extract_first()
                item['site'] = td[2].xpath('a/text()').extract_first()
                item['source'] = 'hacker'
            except IndexError:
                pass
            yield item
