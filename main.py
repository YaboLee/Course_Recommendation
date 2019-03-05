from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
	return "Hello Yabo!"

if __name__ == "__main__":
	app.run(host="0.0.0.0", debug=True)


# import mysql.connector

config = {
        'user': 'test',
        'password': 'test',
        'host': 'db',
        'port': '3306',
        'database': 'test'
    }
connection = mysql.connector.connect(**config)

# print("test")