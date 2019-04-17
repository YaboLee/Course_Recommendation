import MySQLdb
mydb = MySQLdb.connect(host='127.0.0.1',
    port=33061,
    user='test',
    passwd='test',
    db='test',
)
cursor = mydb.cursor()
username = 'test'
password = 'test'
email = 'xinhang2.illinois.edu'
cursor.execute('INSERT INTO USERCOURSES (username,coursenumber,coursetitle,instructor) VALUES("test",241,"CS","Angrave, Lawrence C");')
cursor.execute('INSERT INTO USERCOURSES (username,coursenumber,coursetitle,instructor) VALUES("test",225,"CS","Fagen-Ulmschnei, Wade A");')
cursor.execute('INSERT INTO Interests (Username,CourseSubject,CourseNumber,Instructor)VALUES("test","ECON",103,NULL);')
cursor.execute('INSERT INTO Interests (Username,CourseSubject,CourseNumber,Instructor)VALUES("test","ECON",490,NULL);')
cursor.execute('INSERT INTO Interests (Username,CourseSubject,CourseNumber,Instructor)VALUES("test","MCB",150,"Mehrtens, Bradley G");')
mydb.commit()