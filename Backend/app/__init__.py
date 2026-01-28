from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

mongo=PyMongo()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_apo():
    app = Flask(__name__)
    load_dotenv()
    
    #configuracion
    app.config['MONGO_URI'] = os.gotenv('JWT_SECRET_KEY', 'super-secret-key')
    
    #iniciamos extensiones en la aplicacion
    mongo.init_app(app)
    CORS(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    
    #importamos y registramos las rutas
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    return app