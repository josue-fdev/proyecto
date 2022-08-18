"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os 
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pizzas, MyFood
from api.utils import generate_sitemap, APIException
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.admin import setup_admin
import datetime
import requests

## Nos permite hacer las encripciones de contraseñas
from werkzeug.security import generate_password_hash, check_password_hash

## Nos permite manejar tokens por authentication (usuarios) 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api, resources={r"/*": {"origins": "*"}})



@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    result = list(map(lambda x: x.serialize_user(), users))
    return jsonify(result), 200

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('This user is not in the database', status_code=404)
    result = user.serialize_user()
    return jsonify(result), 200

#This request and response for Pizzas    

@api.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizza = Pizza.query.all()
    result = list(map(lambda x: x.serialize_Pizzas(), pizza))
    return jsonify(result), 200

@api.route('/pizza/<int:pizza_id>', methods=['GET'])
def get_Pizza(pizza_id):
    pizza = Pizzas.query.get(pizza_id)
    if pizza is None:
        raise APIException('This pizza doesnt exist', status_code=404)
    result = pizza.serialize_pizza()
    return jsonify(result), 200

#You only have to do this once
@api.route('/pizzas', methods=['POST'])
def add_pizzas():
    lista=[]
    for i in range(1,11):
        pizza = requests.get(f"https://3000-pink-snail-kxm4roqu.ws-us03.gitpod.io/comicsmarvel/{i}").json()
        lista.append(pizza)
    
    for request_body in lista:
        pizza = Pizzas(name=request_body["name"])
        db.session.add(pizza)
        db.session.commit()

    return jsonify("Pizza were added"), 200



@api.route('/myFood', methods=['GET', 'DELETE'])
@jwt_required()
def get_myFood():
    user_name = get_jwt_identity()
    user = User.query.filter_by(user_name=user_name).first()
    if user is None:
        raise APIException('This user is not in the database', status_code=404)
    user_id = user.id
    
    # Delete all myFood
    if request.method == 'DELETE':
        user_myFood = MyFood.query.filter_by(user_id=user_id)
        for items in user_myFood:
            db.session.delete(items)
            db.session.commit()

    all = myFood.query.all()
    list_myFood = list(map(lambda x: x.serialize_myFood(), all))
    user_myFood = list(filter( lambda x: x["user_id"] == user_id , list_myFood))
    myFood = list(map( lambda x: x["food_name"], user_myFood))
    result = myFood

    return jsonify(result), 200

@api.route('/myFood/<food_name>', methods=['DELETE', 'POST'])
@jwt_required()
def del_myFood(food_name):
    user_name = get_jwt_identity()
    user = User.query.filter_by(user_name=user_name).first()
    if user is None:
        raise APIException('This user is not in the database', status_code=404)
    user_id = user.id
    
    #Delete just one myFood
    if request.method == 'DELETE':
        food = MyFood.query.filter_by(food_name=food_name, user_id=user_id).first()
        if food is None:
            raise APIException('MyFood not found', status_code=404)

        db.session.delete(food)
        db.session.commit()
    #Add MyComic
    if request.method == 'POST':
        pizza = Pizzas.query.all()
        pizza = list(map(lambda x: x.serialize_pizzas(), pizza))



        all = MyFood.query.all()
        list_myFood = list(map(lambda x: x.serialize_myFood(), all))
        user_myFood = list(filter( lambda x: x["user_id"] == user_id , lista_myFood))
        myFood = list(map( lambda x: x["food_name"], user_myFood))
        

        request_body = request.get_json()
        food= MyFood.check_existance("sth", food_name, pizzas, myFood)
        if food is None:
            raise APIException('This food doesnt exist or has already been added', status_code=404)
        pizza = MyFood(user_id = user_id, food_name=myFood)
        db.session.add(pizza)
        db.session.commit()

    #send myFood again
    all = MyFood.query.all()
    list_myFood = list(map(lambda x: x.serialize_myFood(), all))
    user_myFood = list(filter( lambda x: x["user_id"] == user_id , list_myFood))
    myFood = list(map( lambda x: x["food_name"], user_myFood))
    result = myFood


    return jsonify(result), 200

@api.route('/register', methods=["POST"])
def user_register():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_name = request.json.get("user_name", None)
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)

    if not email:
        return jsonify("Email is required"), 400
    if not password:
        return jsonify("Password is required"), 400
    if not user_name:
        return jsonify("Username is required"), 400
    if not first_name:
        return jsonify("First name is required"), 400
    if not last_name:
        return jsonify("Last name is required"), 400

    correo = User.query.filter_by(email=email).first()
    if correo:
        return jsonify("This email is already registered"), 400
    usuario = User.query.filter_by(user_name=user_name).first()
    if usuario:
        return jsonify("Username already in use"), 400

    #pass the encrypted password
    hashed_password = generate_password_hash(password)
    user = User( email=email, password=hashed_password, user_name=user_name, first_name=first_name, last_name=last_name)

    db.session.add(user)
    db.session.commit()

    return jsonify("Thanks. Your register was successful"), 200

@api.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST':
        user_name= request.json.get("user_name", None)
        password = request.json.get("password", None)

        if not user_name:
            return jsonify("Username is required"), 400
        if not password:
            return jsonify("Password is required"), 400

        user = User.query.filter_by(user_name=user_name).first()
        if not user:
            return jsonify("Username/Password are incorrect"), 401
           

        #check the user password
        if not check_password_hash(user.password, password):
            return jsonify("Username/Password are incorrect"), 401

        # token creation
        expiracion = datetime.timedelta(days=3)
        access_token = create_access_token(identity=user.user_name, expires_delta=expiracion)

        #this make you brought the generated token inside
        data = {
            
            "token": access_token,
            "expires": expiracion.total_seconds()*1000,
            
        }

        return jsonify(data), 200
@api.route('/inicio', methods=['POST', 'GET'])
def inicio():

    response_body = {
        "message": "hola",
        "name": "alguien"
    }

    return jsonify(response_body), 200

@api.route('/registrarse', methods=['POST', 'GET'])
def registrarse():

    response_body = {
        "message": "hola",
        "name": "alguien"
    }

    return jsonify(response_body), 200

@api.route('/iniciar_sesion', methods=['POST', 'GET'])
def iniciar_sesion():

    response_body = {
        "message": "hola",
        "name": "alguien"
    }

    return jsonify(response_body), 200

@api.route('/mi_cuenta', methods=['POST', 'GET'])
def mi_cuenta():

    response_body = {
        "message": "hola",
        "name": "alguien"
    }

    return jsonify(response_body), 200

@api.route('/contactos', methods=['POST', 'GET'])
def contactos():

    response_body = {
        "message": "hola",
        "name": "alguien"
    }

    return jsonify(response_body), 200

@api.route('/nosotros', methods=['POST', 'GET'])
def nosotros():

    response_body = {
        "message": "hola",
        "name": "alguien"
    }

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3000))
    app.run(host='0.0.0.0', port=PORT, debug=False)
