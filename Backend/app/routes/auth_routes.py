from flask import Blueprint, jsonify, request
# Importar desde tus otras carpetas nuevas
from Backend.app.models.user import Usuario  
from Backend.app.utils.validators import validar_email

# Crear el Blueprint (es como una mini-app)
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    # Ejemplo usando tus utils
    if not validar_email(request.json.get('email')):
        return jsonify({"error": "Email inválido"}), 400
    
    # Aquí iría tu lógica...
    return jsonify({"msg": "Login desde el Blueprint"})

