import functools
import json
from flask import(
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
bp = Blueprint('auth',__name__, url_prefix='/auth')
from db import get_db
@bp.route('/register',methods = ('GET','POST'))
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
<<<<<<< HEAD
          elif cursor.execute('SELECT * FROM USERS WHERE username = "'+username+'";'):
              return "User already exists!"
          else:
              cursor.execute('INSERT INTO USERS (username,userpassword,email) VALUES ( "'+username+'" , "'+generate_password_hash(password)+'" , "'+email+'" );')
              db.commit()
              return render_template('index.html')
          flash(error)
=======
          else:
              cursor.execute('SELECT * FROM USERS WHERE username = "'+username+'";')
              if cursor.fetchone():
                  return 'User already exists'
              else:
                  cursor.execute('INSERT INTO USERS (username,userpassword,email) VALUES ( "'+username+'" , "'+generate_password_hash(password)+'" , "'+email+'" );')
                  db.commit()
                  return redirect(url_for('auth.login'))
        #   flash(error)
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
      return render_template('register.html')
@bp.route('/login',methods = ('GET','POST'))
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
<<<<<<< HEAD
            print('login successful!')
            return redirect(url_for('main.hello'))
            # return redirect(url_for('/'))
        print(error)
    return render_template('login.html')
# @bp.before_app_request
# def load_logged_in_user():
#     user_id = session.get('user_id')

#     if user_id is None:
#         g.user = None
#     else:
#         g.user = get_db().execute(
#             'SELECT * FROM user WHERE id = ?', (user_id,)
#         ).fetchone()
=======
            session['username'] = username
            print('login successful!')
            return redirect(url_for('hello'))
            # return redirect(url_for('/'))
        print(error)
    return render_template('login.html')
@bp.before_app_request
def load_logged_in_user():
    username = session.get('username')
    if username is None:
        g.username = None
    else:
        g.username = username
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886

# @bp.route('/logout')
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