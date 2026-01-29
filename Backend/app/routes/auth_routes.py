from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from app.models.user import User
from app.utils.validators import validar_email

auth_bp = Blueprint('auth', __name__)

# RUTA 1: REGISTRO (Crear cuenta)
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    nombre = data.get('nombre')
    email = data.get('email')
    password = data.get('password')

    # 1. Validaciones
    if not nombre or not email or not password:
        return jsonify({"error": "Faltan datos (nombre, email, password)"}), 400

    if not validar_email(email):
        return jsonify({"error": "Formato de email inválido"}), 400

    # 2. Verificar si el usuario ya existe en la DB
    if User.find_by_email(email):
        return jsonify({"error": "El correo ya está registrado"}), 400

    # 3. Crear el usuario (La contraseña se encripta en el modelo)
    user_id = User.create_user(nombre, email, password)
    
    return jsonify({"msg": "Usuario creado exitosamente", "id": user_id}), 201


# RUTA 2: LOGIN (Obtener Token)
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Faltan credenciales"}), 400

    # 1. Buscar usuario por email
    user = User.find_by_email(email)
    
    # 2. Verificar que exista y que la contraseña coincida
    if user and User.check_password(user['password'], password):
        # 3. Generar el Token JWT (La 'identity' será el ID del usuario)
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify({
            "msg": "Login exitoso",
            "token": access_token,
            "nombre": user['nombre']
        }), 200
    
    return jsonify({"error": "Correo o contraseña incorrectos"}), 401