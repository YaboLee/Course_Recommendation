from .db import get_db
from flask import jsonify

def responseMessage(data={}, message="", status=200):
    """
        Create a response message with format.
        data: dict
            Should be key-value pair in order to meet json.
        message: str
            Message to the client.
        status: int
            Status code indicating the status.
    """
    response = {
        'success': 200 <= status < 300,
        'code': status,
        'message': message,
        'data': data
    }
    return jsonify(response), status
