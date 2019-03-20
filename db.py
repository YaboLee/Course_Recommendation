import MySQLdb
from flask import current_app, g
from flask.cli import with_appcontext
import MySQLdb
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
        g.db =MySQLdb.connect(**config)
    return g.db