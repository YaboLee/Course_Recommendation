import flask

app = flask.Flask("app")

@app.route('/')
def index():
  return flask.render_template("index.html", token="react connect with flask")


app.run(debug=True)
