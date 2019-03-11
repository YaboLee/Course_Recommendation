import csv
import mysql.connector
import os
import re
mydb = mysql.connector.connect(host='db',
    port=3306,
    user='test',
    passwd='test',
    db='test')
if not os.path.exists("datasets"):
    os.system('git clone https://github.com/wadefagen/datasets.git')
os.system('mysql --host=db --port=3306 -u test -ptest < schema.sql')
def InsertTerm(semster,year):
    # cursor.execute('')
    if not os.path.exists('datasets/gpa/raw/'+semster+str(year)+'.csv'):
        return 
    csv_file = open('datasets/gpa/raw/'+semster+str(year)+'.csv',encoding='utf8',errors = 'ignore')
    csv_data = csv.reader(csv_file)
    cursor = mydb.cursor()
    j = 0
    regint = re.compile('^[-+]?[0-9.]+$')
    print('Inserting '+semster+' '+str(year)+' data...')
    for row in csv_data:
        # print(row)
        exestr = 'INSERT INTO Courses1 VALUES('+str(year)+',"'+semster.capitalize()+'",'
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
                            if regint.match(row[i][:-1])!=None:
                                exestr+=row[i][:-1]+','
                            else:
                                exestr+='"'+row[i]+'",'
                        elif '"' in row[i]:
                            exestr+='"'+row[i].replace('"','||')+'",'
                        else:   
                            exestr+='"'+row[i]+'",'
            exestr = exestr[:-1] + ")"
            # print(exestr)
            cursor.execute(exestr)
        j+=1
    cursor.close()
for year in range(2010,2017):
    InsertTerm('sp',year)
    InsertTerm('su',year)
    if not year==2016:
        InsertTerm('fa',year)
# InsertTerm('sp',2013)
mydb.commit()
print ("Initialization Finshed")