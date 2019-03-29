import functools
import json
from flask import(
    Blueprint, flash, g, redirect, render_template, request, session, url_for,jsonify
)
from db import get_db
bp = Blueprint('api',__name__, url_prefix='/api')
#GET: {'coursesubject':'CS','coursenumber',241}
@bp.route('/searchCourse',methods = ('GET','POST'))
def searchCourse():
    if request.method == 'GET':
        coursesubject = request.args.get('courseSubject')
        coursenumber = request.args.get('courseNumber')
        if coursesubject == None or coursenumber == None:
            dic = {'':'Please enter course'}
            return json.dumps(dic)
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute('SELECT CourseTitle as title, Instructor as ins ,Aplus as aplus,A as a  FROM Courses2 WHERE CourseSubject = "'+coursesubject+'" and CourseNumber ='+ coursenumber+';')
        data = cursor.fetchall()
        dic = {'courseInfo':data} 
    return jsonify(dic)

@bp.route('/loginOrNot',methods = ('GET','POST'))
def loginOrNot():
    if request.method == 'GET':
        login = True
        username = g.username
        if username == None:
            login = False
        dic = {'logedin':login,'userName':username}
    return json.dumps(dic)
@bp.route('/userCourse',methods=('GET','POST'))
def userCourse():
    if request.method == 'POST':
        return 'jello'
    if request.method == 'GET':
        username = g.username
        print(username)
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute('SELECT CourseTitle as title,Coursenumber as number, Instructor as ins FROM USERCOURSES WHERE username= "'+username+'";')
        data = cursor.fetchall()
        dic = {'usercourse': data}
    return jsonify(dic)