from flask import Flask, render_template, url_for, request
from flask_cors import CORS

app = Flask(__name__, static_folder="./static", template_folder="./templates")
app.config.from_mapping(
        SECRET_KEY='dev'
    )
# app = Flask(__name__,instance_relative_config=True)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def hello():
	return render_template("index.html")

# @app.route("/register", methods=('GET', 'POST'))
# def register():
#     if request.method == 'POST':
#         print(request.data)
#     return render_template("register.html")

# @app.route("/login", methods=('GET', 'POST'))
# def login():
#     if request.method == 'POST':
#         print(request.data)
#     return render_template("login.html")
import authen
app.register_blueprint(authen.bp)
if __name__ == "__main__":
	app.run(host="0.0.0.0", debug=True)



