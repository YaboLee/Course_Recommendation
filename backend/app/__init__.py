from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

socketio = SocketIO()

def create_app(debug=True):
    """Create an application."""
    app = Flask(__name__)
    app.debug = debug
    app.config['SECRET_KEY'] = 'gjr39dkjn344_!67#'
    CORS(app, resources={r"/*": {"origins": "*"}})

    from .routes import authen
    from .api import api

    app.register_blueprint(authen.auth_bp)
    app.register_blueprint(api.api_bp)

    socketio.init_app(app)
    return app
