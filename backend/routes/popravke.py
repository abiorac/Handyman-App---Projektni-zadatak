from flask import Blueprint, request, jsonify
from models.popravka import sacuvaj_popravku, get_popravke_korisnika

popravke_bp = Blueprint('popravke', __name__)

@popravke_bp.route('/api/popravke/<int:user_id>', methods=['GET'])
def list_popravke(user_id):
    return jsonify(get_popravke_korisnika(user_id)), 200

@popravke_bp.route('/api/popravke', methods=['POST'])
def add_popravka():
    data = request.json
    sacuvaj_popravku(data['user_id'], data)
    return jsonify({"message": "Popravka sačuvana"}), 201