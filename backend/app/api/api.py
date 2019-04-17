import functools
import json
from flask import(
    g, redirect, render_template, request, session, url_for,jsonify
)
from kafka import KafkaProducer

from ..utils import get_db, responseMessage
from . import api_bp
from main import socketio

def GPA(coursesubject,coursenumber):
    db = get_db()
    cursor = db.cursor(dictionary = True)
    cursor.execute('SELECT T1.instructor,T1.GPA,T2.LIKES FROM ( (SELECT Instructor as instructor, CAST(ROUND(AVG(Course_GPA),3) AS CHAR) as GPA FROM(SELECT((Aplus*4.0+A*4.0+Aminus*3.67+Bplus*3.33+B*3.0+Bminus*2.67+Cplus*2.33+C*2.0+Cminus*1.67+Dplus*1.33+D*1.00+Dminus*0.67) / (Aplus+A+ Aminus+Bplus+B+Bminus+Cplus+C+Cminus+Dplus+D+Dminus+F) ) as Course_GPA, Instructor, LIKES FROM Courses2 WHERE CourseSubject = "'+coursesubject+'" AND CourseNumber = '+coursenumber+' ) as temp GROUP BY Instructor) AS T1 INNER JOIN (SELECT Instructor, LIKES FROM Courses3 WHERE CourseSubject = "'+coursesubject+'" AND CourseNumber = '+coursenumber+' ) as T2 ON T1.instructor = T2.Instructor);')
    GPA = cursor.fetchall()
    cursor.execute('SELECT DISTINCT CourseTitle,LIKES FROM Courses2 WHERE CourseNumber='+coursenumber+' and CourseSubject="'+coursesubject+'";')
    coursetitle = cursor.fetchall()
    print(coursetitle)
    return GPA,coursetitle
#GET: {'coursesubject':'CS','coursenumber',241}
#return
# {'courseInfo': [{'instructor': 'Angrave, Lawrence C', 'GPA': '2.774'}, 
# {'instructor': 'Evans, Graham C', 'GPA': '2.619'}, 
# {'instructor': 'Caccamo, Marco', 'GPA': '2.545'}, 
# {'instructor': 'Fagen, Wade A', 'GPA': '2.492'}, {'instructor': 'Kravets, Robin H', 'GPA': '2.396'}], 
# 'title': 'System Programming', 'coursenumber': '241', 'coursesubject': 'cs'}
@api_bp.route('/searchCourse',methods = ('GET','POST'))
def searchCourse():
    if request.method == 'GET':
        coursename = request.args.get('searchCourseName')
        print(coursename)
        coursesubject = ''
        coursenumber = ''
        numbers = ['1','2','3','4','5','6','7','8','9','0']
        i = 0
        while(i<len(coursename)):
            if coursename[i] in numbers:
                coursenumber+=coursename[i]
            else:
                coursesubject+=coursename[i]
            i+=1
        print(coursesubject)
        print(coursenumber)
        if coursesubject == None or coursenumber == None:
            dic = {'':'Please enter course'}
            return json.dumps(dic)
        # db = get_db()
        # cursor = db.cursor(dictionary=True)
        # cursor.execute('SELECT CourseTitle as title, Instructor as ins ,Aplus as aplus,A as a  FROM Courses2 WHERE CourseSubject = "'+coursesubject+'" and CourseNumber ='+ coursenumber+';')
        data,title = GPA(coursesubject,coursenumber)
        print(data)
        print(title)
        # data = cursor.fetchall()
        dic = {'courseInfo':data} 
        dic["title"] = title[0]['CourseTitle']
        dic["coursenumber"] = coursenumber
        dic['coursesubject'] = coursesubject 
        print(dic)
        return responseMessage(dic, status=200)

# @api_bp.route('/loginOrNot',methods = ('GET','POST'))
# def loginOrNot():
#     if request.method == 'GET':
#         if username == None:
#             print("not log in")
#             return responseMessage({"logedin": False}, status=301)
#         print("logedin")
#         dic = {'logedin': True, 'userName':username}
#         return responseMessage(dic, status=200)

@api_bp.route('/userCourse',methods=('GET','POST'))
def userCourse():
    if request.method == 'POST':
        return 'jello'
    if request.method == 'GET':
        username = request.args.get("userName")
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute('SELECT CourseTitle as courseSubject, Coursenumber as courseNumber, Instructor as courseInstructor FROM USERCOURSES WHERE username= "'+username+'";')
        data = cursor.fetchall()
        dic = {'usercourse': data}
        return responseMessage(dic, status=200)

#{'coursesubject':'CS',coursenumber':241,'instructor':'Angrave'}
@api_bp.route('/addCourse',methods=('GET','POST'))
def addCourse():
    if request.method == 'POST':
        addcourse = json.loads(request.data)
        coursesubject = addcourse['courseSubject']
        coursenumber = addcourse['courseNumber']
        instructor = addcourse['courseInstructor']
        username = addcourse["userName"]
        # coursesubject = 'KIN'#test
        # coursenumber = '249'#test
        # instructor = 'Wade Fagen'#test
        # username = 'test'#test
        db = get_db()
        cursor = db.cursor()
        cursor.execute('INSERT INTO USERCOURSES (username,coursenumber,coursetitle,instructor) VALUES("'+username+'",'+coursenumber+',"'+coursesubject+'","'+instructor+'");')
        db.commit()
        ret = {
            "courseSubject": coursesubject,
            "courseNumber": coursenumber,
            "courseInstructor": instructor,
        }
        return responseMessage(ret, status=200)

@api_bp.route('/deleteCourse',methods=('GET','POST'))
def deleteCourse():
    if request.method == 'POST':
        deletecourse = json.loads(request.data)
        coursesubject = deletecourse['courseSubject']
        coursenumber = str(deletecourse['courseNumber'])
        instructor = deletecourse['courseInstructor']
        username = deletecourse["userName"]
        # coursesubject = 'KIN'#test
        # coursenumber = '249'#test
        # instructor = 'Wade Fagen'#test
        # username = 'test'#test
        db = get_db()
        cursor = db.cursor()
        cursor.execute('DELETE FROM USERCOURSES WHERE USERNAME = "'+username+'" AND COURSENUMBER = '+coursenumber+' AND COURSETITLE = "'+coursesubject+'" AND INSTRUCTOR = "'+instructor+'";')
        db.commit()
        return responseMessage(status=200)

@api_bp.route('/thumbsUp',methods = ('GET','POST'))
def thumbsUp():
    if request.method == 'POST':
        course  =json.loads(request.data)
        coursesubject = course['courseSubject']
        coursenumber = str(course['courseNumber'])
        instructor = course['courseInstructor']
        print(coursesubject,coursenumber,instructor)
        db = get_db()
        cursor = db.cursor()
        cursor.execute('UPDATE Courses3 SET LIKES := LIKES+1 WHERE CourseNumber = '+coursenumber+' AND CourseSubject =  "'+coursesubject+'" AND Instructor = "'+instructor+'";')
        db.commit()
    return responseMessage(status=200)

@api_bp.route('/comment',methods = ('GET','POST'))
def comment():
    if request.method =='POST':
        # producer = KafkaProducer(bootstrap_servers='localhost:9092')
        # producer.send('test', request.data)

        course = json.loads(request.data)
        username = course['userName']
        coursesubject = course['courseSubject']
        coursenumber = str(course['courseNumber'])
        instructor = course['courseInstructor']
        comment = course['courseComment']
        db = get_db()
        cursor = db.cursor()
        print('INSERT INTO CourseComment (USERNAME,CourseSubject,CourseNumber,Instructor,CourseComment) VALUES("'+username+'",'+coursesubject+'",'+coursenumber+',"'+instructor+'","'+comment+'")')
        cursor.execute('INSERT INTO CourseComment (USERNAME,CourseSubject,CourseNumber,Instructor,CourseComment) VALUES("'+username+'","'+coursesubject+'",'+coursenumber+',"'+instructor+'","'+comment+'")')
        db.commit()
    return responseMessage(status=200)
@api_bp.route('/showComment',methods = ('GET','POST'))
def showComment():
    if request.method == 'GET':
        username = request.args.get('userName')
        db = get_db()
        cursor = db.cursor()
        sql = 'SELECT * FROM CourseComment WHERE CourseSubject = %s AND CourseNumber = %s AND Instructor = %s'
        sql2 = 'SELECT * FROM CourseComment WHERE CourseSubject = %s AND CourseNumber = %s'
        cursor.execute('SELECT * FROM Interests WHERE Username = "'+username+'";')
        tags = cursor.fetchall()
        interstcomments = []
        for t in tags:
            if t[4] == None:
                cursor.execute(sql2,(t[2],t[3]))
                l = cursor.fetchall()
                interstcomments+=l
            else:
                cursor.execute(sql,(t[2],t[3],t[4]))
                l = cursor.fetchall()
                interstcomments+=l
        dic = {'comments': interstcomments}
        return responseMessage(dic, status=200)
    

@socketio.on("connect")
def reply():
    print("connect")