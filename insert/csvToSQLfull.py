import csv
import mysql.connector as MySQLdb
import os
import re
# import pandas
mydb = MySQLdb.connect(host='127.0.0.1',
    port=33061,
    user='test',
    passwd='test',
    db='test')
if not os.path.exists("datasets"):
    os.system('git clone https://github.com/wadefagen/datasets.git')
os.system('mysql --host=127.0.0.1 --port=33061 -u test -ptest < schemafull.sql')
os.system('mysql --host=127.0.0.1 --port=33061 -u test -ptest < userschema.sql')
csv_file = open('datasets/gpa/uiuc-gpa-dataset.csv',encoding='utf8',errors='ignore')
csv_data = csv.reader(csv_file)
cursor = mydb.cursor()
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

