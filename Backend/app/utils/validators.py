import re

def validar_email(email):
    if not email: return False
    # Regex simple para validar email
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None