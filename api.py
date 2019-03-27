import functools
import json
from flask import(
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from db import get_db
bp = Blueprint('api',__name__, url_prefix='/api')
#GET: {'coursesubject':'CS','coursenumber',241}
@bp.route('/searchCourse',methods = ('GET','POST'))
def searchCourse():
    if request.method == 'GET':
        coursesubject = request.args.get('courseSubject')
        coursenumber = request.args.get('courseNumber')
        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT json_object("coursetitle",title,"instructor",ins,"aplus",aplus,"a",a) FROM (SELECT CourseTitle as title, Instructor as ins ,Aplus as aplus,A as a  FROM Courses2 WHERE CourseSubject = "'+coursesubject+'" and CourseNumber ='+ coursenumber+') as T;')
        data = cursor.fetchall()
        dic = {'courseInfo':data} 
    return json.dumps(dic)

@bp.route('/loginOrNot',methods = ('GET','POST'))
def loginOrNot():
    if request.method == 'GET':
        login = True
        username = g.username
        if username == None:
            login = False
        dic = {'logedin':login,'userName':username}
    return json.dumps(dic)
        