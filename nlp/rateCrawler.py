import requests
import os
import sys
import string
import time
from bs4 import BeautifulSoup as bs
user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import matplotlib.pyplot as plt
# nltk.download('vader_lexicon')
def score(paragraph):
    sid = SentimentIntensityAnalyzer()
    ss = sid.polarity_scores(paragraph)
    return ss['pos']-ss['neg']
def init_soup(url):
    kv = {'user-agent':user_agent}
    try:
        r = requests.get(url,headers = kv)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
        html = r.text
        soup = bs(html,'html.parser')
        print('connection successful!')
        # print(soup.prettify())
    except:
        print('failed to crawl:'+str(r.status_code))
    return soup

import csv
k = {'awesome':5,'good':4,'average':3,'poor':2,'awful':1}
def crawlpage(pageid):
    points = []
    soup = init_soup('https://www.ratemyprofessors.com/ShowRatings.jsp?tid='+str(pageid)+'&showMyProfs=true')
    tagscomment = soup.find_all("p", {"class": "commentsParagraph"})
    tagsrate = soup.find_all("span",{"class":"rating-type"})
    for i in range(len(tagscomment)):
        points.append([score(tagscomment[i].text),k[tagsrate[i].text]])
    with open("dataset.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerows(points)
        f.close()   
for i in range(141100,141200):
    crawlpage(i)
    time.sleep(1)
# plt.scatter(x,y)
# plt.show()
correct = 0
# for i in range(len(x)):
#     if x[i]<=0:
#        if y[i] <3:
#            correct+=1
#     else:
#         if y[i] >= 3:
#            correct+=1
# print(correct/len(x))