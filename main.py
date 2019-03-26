<<<<<<< HEAD
from flask import Flask, render_template, url_for, request
from flask_cors import CORS

=======
from flask import Flask, render_template, url_for, request,g
from flask_cors import CORS
from db import get_db
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
app = Flask(__name__, static_folder="./static", template_folder="./templates")
app.config.from_mapping(
        SECRET_KEY='dev'
    )
# app = Flask(__name__,instance_relative_config=True)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def hello():
<<<<<<< HEAD
	return render_template("index.html")

# @app.route("/register", methods=('GET', 'POST'))
# def register():
#     if request.method == 'POST':
#         print(request.data)
#     return render_template("register.html")

=======
    # print(g.username)
    # username = g.username
    # db = get_db()
    # cursor = db.cursor()
    # cursor.execute("SELECT * FROM Courses2")
    # data = cursor.fetchall()
    return render_template('index.html')

# @app.route("/register", methods=('GET', 'POST'))
# def register():
#     if request.method == 'POST':
#         print(request.data)
#     return render_template("register.html")

>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
# @app.route("/login", methods=('GET', 'POST'))
# def login():
#     if request.method == 'POST':
#         print(request.data)
#     return render_template("login.html")
import authen
app.register_blueprint(authen.bp)
if __name__ == "__main__":
	app.run(host="0.0.0.0", debug=True)

<<<<<<< HEAD


=======
>>>>>>> 5914bf983a2409f124d5643615eab3d85e334886
