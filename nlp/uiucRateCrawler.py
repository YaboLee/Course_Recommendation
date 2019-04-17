import requests
import time
import os
import sys
import re
from bs4 import BeautifulSoup as bs
user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
r = open('main.html','r')
soup = bs(r,'html.parser')
tags = soup.find_all('li',id= True)
id_list = []
for tag in tags:
    if 'my-professor-' in tag['id']:
        id_list.append(int(tag['id'].split('-')[-1]))
# print(id_list,len(id_list))
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
def crawlpage(pageid):
    comments = []
    soup = init_soup('https://www.ratemyprofessors.com/ShowRatings.jsp?tid='+str(pageid)+'&showMyProfs=true')
    lname = soup.find_all('span',{'class':'pfname'})
    fname = soup.find_all('span',{'class':'plname'})
    responses = soup.find_all('span',{'class':'response'})
    courses = []
    for r in responses:
        if '1' in r.text or '2' in r.text or '3' in r.text or '4' in r.text:
            courses.append(r.text)
    lastname = ''
    firstname = ''
    for n in lname:
        lastname+=n.text
    for n in fname:
        firstname+=n.text
    lastname = lastname.strip()
    firstname = firstname.strip()
    tagscomment = soup.find_all("p", {"class": "commentsParagraph"})
    tagsrate = soup.find_all("span",{"class":"rating-type"})
    fullname = firstname+', '+lastname
    for i in range(len(tagscomment)):
        l = re.split('(\d+)',courses[i])
        comments.append([fullname,l[0],int(l[1]),tagscomment[i].text,tagsrate[i].text])
    with open("commentset.csv", "a") as f:
        writer = csv.writer(f)
        writer.writerows(comments)
        f.close()   
for i in range(2,30):
    time.sleep(1)
    crawlpage(id_list[i])

    
     
