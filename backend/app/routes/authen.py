import functools
import json
from flask import(
    Blueprint, flash, g, request, session, url_for, render_template, redirect
)
from werkzeug.security import check_password_hash, generate_password_hash

from . import auth_bp

from ..utils import get_db

@auth_bp.route('/register',methods = ('GET','POST'))
def register():
      if request.method == 'POST':
          print(request.data)
          info = json.loads(request.data)
          username = info['username']
          password = info['password']
          email = info['email']
          db = get_db()
          cursor = db.cursor()
          error = None
          if not username:
              error = 'Username is required!'
          elif not password:
              error = 'Password is required!'
          elif not email:
              error = 'Email is required!'
          else:
              cursor.execute('SELECT * FROM USERS WHERE username = "'+username+'";')
              if cursor.fetchone():
                  return 'User already exists'
              else:
                  cursor.execute('INSERT INTO USERS (username,userpassword,email) VALUES ( "'+username+'" , "'+generate_password_hash(password)+'" , "'+email+'" );')
                  db.commit()
                  return redirect(url_for('auth.login'))
        #   flash(error)
      return render_template('register.html')
@auth_bp.route('/login',methods = ('GET','POST'))
def login():
    if request.method == 'POST':
        print(request.data)
        info = json.loads(request.data)
        username = info['username']
        password = info['password']
        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT * FROM USERS WHERE username = "'+username+'";')
        user = cursor.fetchone()
        error = None
        if user is None:
            error = 'Please enter valid username'
        elif not check_password_hash(user[1],password):
            error = 'Incorrect password'
        if error is None:
            session.clear()
            session['username'] = username
            print('login successful!')
            return redirect(url_for('hello'))
            # return redirect(url_for('/'))
        print(error)
    return render_template('login.html')
@auth_bp.before_app_request
def load_logged_in_user():
    username = session.get('username')
    if username is None:
        g.username = None
    else:
        g.username = username
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.username is None:
            return redirect(url_for('auth.login'))
        return view(**kwargs)
    return wrapped_view
# @auth_bp.route('/logout')
# def logout():
#     session.clear()
#     return redirect(url_for('index'))

# def login_required(view):
#     @functools.wraps(view)
#     def wrapped_view(**kwargs):
#         if g.user is None:
#             return redirect(url_for('auth.login'))
#         return view(**kwargs)
#     return wrapped_view