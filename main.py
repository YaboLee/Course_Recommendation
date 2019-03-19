from flask import Flask, render_template, url_for, request
from flask_cors import CORS


app = Flask(__name__, static_folder="./static", template_folder="./static/templates")
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
def hello():
	return render_template("index.html")

@app.route("/register", methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        print(request.data)
    return render_template("register.html")

if __name__ == "__main__":
	app.run(host="0.0.0.0", debug=True)


