from flask import Blueprint, request, jsonify
from app.models.ticket import Ticket # Importamos el modelo que hicimos

tickets_bp = Blueprint('tickets', __name__)

@tickets_bp.route('/crear', methods=['POST']) 
def crear_ticket():
    data = request.json
    nuevo_ticket = Ticket(data['titulo'], data['descripcion'], data['creado_por'])
    nuevo_ticket.crear()
    return jsonify({"msg": "Ticket creado"}), 201


@tickets_bp.route('/', methods=['GET']) 
def obtener_tickets():
    tickets = Ticket.obtener_todos()
    
    lista_tickets = []
    for t in tickets:
        t['_id'] = str(t['_id'])
        lista_tickets.append(t)
        
    return jsonify(lista_tickets), 200

@tickets_bp.route('/mis_tickets/<email>', methods=['GET'])
def obtener_mis_tickets(email):
    tickets = Ticket.obtener_mis_tickets(email)
    
    lista_tickets = []
    for t in tickets:
        t['_id'] = str(t['_id'])
        lista_tickets.append(t)
        
    return jsonify(lista_tickets), 200

@tickets_bp.route('/filtrar', methods=['POST'])
def filtrar_tickets():
    filtros = request.json
    tickets = Ticket.filtrar(filtros)
    
    lista_tickets = []
    for t in tickets:
        t['_id'] = str(t['_id'])
        lista_tickets.append(t)
        
    return jsonify(lista_tickets), 200

@tickets_bp.route('/<ticket_id>', methods=['GET'])
def obtener_ticket(ticket_id):
    ticket = Ticket.obtener_por_id(ticket_id)
    if not ticket:
        return jsonify({"error": "Ticket no encontrado"}), 404
    
    ticket['_id'] = str(ticket['_id'])
    return jsonify(ticket), 200

@tickets_bp.route('/<ticket_id>', methods=['DELETE'])
def eliminar_ticket(ticket_id):
    resultado = Ticket.eliminar(ticket_id)
    if resultado.deleted_count == 0:
        return jsonify({"error": "Ticket no encontrado"}), 404
    
    return jsonify({"msg": "Ticket eliminado"}), 200