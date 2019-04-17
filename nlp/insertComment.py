import csv
import MySQLdb
import random
import string
with open('commentset.csv','r') as f:
    comments = list(csv.reader(f))
print(comments)
db = MySQLdb.connect(host='127.0.0.1',port=33061,user='test',password='test',db = 'test')
for c in comments:
    coursesubject = c[1]
    coursenumber =  c[2]
    instructor =  c[0]
    comment = c[3]
    sql = "INSERT INTO CourseComment(USERNAME,CourseSubject,CourseNumber,Instructor,CourseComment) VALUES (%s, %s,%s,%s,%s)"
    username = ''.join(random.choice(string.ascii_uppercase + string.digits+string.ascii_lowercase) for _ in range(20))
    cursor = db.cursor()
    if cursor.execute('SELECT * FROM Courses2 WHERE Instructor LIKE "'+instructor+'%"'+'AND CourseSubject = "'+coursesubject+'" AND CourseNumber = '+coursenumber+';'):
        data = cursor.fetchone()
        instructor = data[-2]
        val = (username,coursesubject,coursenumber,instructor,comment)
        print('INSERT INTO CourseComment (USERNAME,CourseSubject,CourseNumber,Instructor,CourseComment) VALUES("'+username+'","'+coursesubject+'",'+coursenumber+',"'+instructor+'","'+comment+'");')
        cursor.execute(sql,val)
db.commit()