from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

mongo = PyMongo()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    load_dotenv()
    
    # Configuración correcta
    app.config['MONGO_URI'] = os.getenv('MONGO_URI', 'mongodb://localhost:27017/perfil_db')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'super-secret-key')
    
    # Inicializar extensiones
    mongo.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}})
    jwt.init_app(app)
    bcrypt.init_app(app)
    
    # Importar y registrar rutas
    from app.routes.auth_routes import auth_bp
    from app.routes.ticket_routes import tickets_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(tickets_bp, url_prefix='/api/tickets')
    
    return app