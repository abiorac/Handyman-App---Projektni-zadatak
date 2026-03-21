from flask import Blueprint, request, jsonify
from models.user import create_user, get_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Korisničko ime i lozinka su obavezni"}), 400
    
    # create_user funkcija u models/user.py treba da vrati True ako je upis uspeo
    if create_user(data['username'], data['password']):
        return jsonify({"message": "Uspešna registracija"}), 201
    else:
        return jsonify({"error": "Korisničko ime je već zauzeto"}), 400

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Podaci nisu poslati"}), 400
        
    user = get_user(data.get('username'), data.get('password'))
    
    if user:
        return jsonify({
            "id": user['id'], 
            "username": user['username']
        }), 200
    
    return jsonify({"error": "Pogrešno korisničko ime ili lozinka"}), 401