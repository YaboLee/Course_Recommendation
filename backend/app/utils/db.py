import mysql.connector as MySQLdb
from flask import current_app, g
from flask.cli import with_appcontext
config = {
        'user': 'test',
        'password': 'test',
        'host': 'db',
        'port': '3306',
        'database': 'test'
    }
def get_db():
    global config
    if 'db' not in g:
        g.db = MySQLdb.connect(host='127.0.0.1',port=33061,user='test',password='test',db = 'test',auth_plugin='mysql_native_password')
    return g.db