import csv
import MySQLdb
import os
import re
mydb = MySQLdb.connect(host='127.0.0.1',
    port=33061,
    user='test',
    passwd='test',
    db='test')
if not os.path.exists("datasets"):
    os.system('git clone https://github.com/wadefagen/datasets.git')
os.system('mysql --host=127.0.0.1 --port=33061 -u test -ptest < schema.sql')
cursor = mydb.cursor()
# cursor.execute('')
csv_file = open('datasets/gpa/raw/fa2010.csv')
csv_data = csv.reader(csv_file)
j = 0
regint = re.compile('^[-+]?[0-9.]+$')
for row in csv_data:
    # print(row)
    exestr = 'INSERT INTO Courses1 VALUES(2010,'
    if j>0:
        for i in range(len(row)):
            if row[5] == '':
                row[5] = 'N\\A'
            if regint.match(row[i])!=None:
                exestr += row[i]+','
            else:
                if row[i]=='N/A' or row[i]=='':
                    exestr+='NULL,'
                else:
                    if row[i][-1]=='%':
                        # print(row[i])
                        exestr+=row[i][:-1]+','
                    else:   
                        exestr+='"'+row[i]+'",'
        exestr = exestr[:-1] + ")"
        # print(exestr)
        cursor.execute(exestr)
    j+=1
mydb.commit()
cursor.close()
print ("Initialization Finshed")