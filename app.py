from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import database
from objects import User, Plant
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp

app = Flask(__name__)

db = database.model()

def authenticate(username, password):
    user = db.get_user_by_username(username=username)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    user = db.get_user_by_id(user_id=user_id)
    return user

app.config['SECRET_KEY'] = 'This is a secret key!'

jwt = JWT(app, authenticate, identity)

@app.route('/new_user', methods=["POST"])
def new_user():
    credentials = request.get_json()
    if db.create_user(credentials["username"],credentials["password"]):
        return jsonify("Success"), 201
    return jsonify("Couldn't create user"), 500

@app.route('/plants/all', methods=["GET"])
@jwt_required()
def get_plants():
    plants = db.get_plants(current_identity.user_id)



@app.route('/dashboard', methods=["GET"])
@jwt_required()
def dashboard():
    user = current_identity
    return jsonify(user.name)


if __name__ == "__main__":
    app.run(debug=True)
