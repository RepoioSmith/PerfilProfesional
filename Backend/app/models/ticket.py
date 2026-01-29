from app import mongo
from datetime import datetime
from bson import ObjectId

class Ticket:
    def __init__(self, titulo, descripcion, made_by, state='pending', priority='medium'):
        self.titulo = titulo
        self.descripcion = descripcion
        self.made_by = made_by
        self.state = state
        self.priority = priority
        self.created_at = datetime.utcnow()

    # MÉTODOS MOVIDOS AFUERA DEL __INIT__
    def create(self):
        ticket_json = {
            'title': self.titulo,
            'description': self.descripcion,
            'state': self.state,
            'priority': self.priority,
            'made_by': self.made_by,
            'created_at': self.created_at,
        }
        return mongo.db.tickets.insert_one(ticket_json)
    
    @staticmethod
    def get_all_tickets():
        return list(mongo.db.tickets.find())
    
    @staticmethod
    def filter(filter_dict):
        return list(mongo.db.tickets.find(filter_dict))
    
    @staticmethod
    def get_my_tickets(user_email):
        return list(mongo.db.tickets.find({'made_by': user_email}))
        
    @staticmethod
    def obtener_por_id(ticket_id):
        try:
            return mongo.db.tickets.find_one({"_id": ObjectId(ticket_id)})
        except:
            return None

    @staticmethod
    def eliminar(ticket_id):
        return mongo.db.tickets.delete_one({"_id": ObjectId(ticket_id)})