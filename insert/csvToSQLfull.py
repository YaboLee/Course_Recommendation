import csv
import mysql.connector as MySQLdb
import os
import re
from werkzeug.security import check_password_hash, generate_password_hash
# import pandas
mydb = MySQLdb.connect(host='db',
    port=3306,
    user='test',
    passwd='test',
    db='test',
    auth_plugin='mysql_native_password')
if not os.path.exists("datasets"):
    os.system('git clone https://github.com/wadefagen/datasets.git')
os.system('mysql --host=db --port=3306 -u test -ptest < schemafull.sql')
os.system('mysql --host=db --port=3306 -u test -ptest < userschema.sql')
csv_file = open('datasets/gpa/uiuc-gpa-dataset.csv',encoding='utf8',errors='ignore')
csv_data = csv.reader(csv_file)
cursor = mydb.cursor()
username = 'test'
password = 'test'
email = 'xinhang2.illinois.edu'
cursor.execute('INSERT INTO USERS (username,userpassword,email) VALUES ( "'+username+'" , "'+generate_password_hash(password)+'" , "'+email+'" );')
cursor.execute('INSERT INTO USERCOURSES (username,coursenumber,coursetitle,instructor) VALUES("test",241,"CS","Angrave, Lawrence C");')
cursor.execute('INSERT INTO USERCOURSES (username,coursenumber,coursetitle,instructor) VALUES("test",225,"CS","Fagen-Ulmschnei, Wade A");')
mydb.commit()
regint = re.compile('^[-+]?[0-9.]+$')
# print(csv_data)
j = 0
for row in csv_data:
    # print(row)
    exestr = 'INSERT INTO Courses2 VALUES('+str(j)+','
    if j > 0:
        for i in range(len(row)):
            if regint.match(row[i])!=None:
                exestr+=row[i]+','
            else:
                if row[i] == 'N/A' or row[i] == '':
                    exestr += 'NULL,'
                else:
                    if '"' in row[i]:
                        exestr+='"'+row[i].replace('"','||')+'",'
                    else:
                        exestr+='"'+row[i]+'",'
        exestr = exestr[:-1] + ")"
        # print(exestr)
        cursor.execute(exestr)
    j+=1
cursor.close()
mydb.commit()

