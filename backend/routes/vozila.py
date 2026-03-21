from flask import Blueprint, request, jsonify
from models.vozilo import create_vozilo, get_vozila_by_user, delete_vozilo

vozila_bp = Blueprint('vozila', __name__)

@vozila_bp.route('/api/vozila/<int:user_id>', methods=['GET'])
def get_user_cars(user_id):
    vozila = get_vozila_by_user(user_id)
    return jsonify(vozila), 200

@vozila_bp.route('/api/vozila', methods=['POST'])
def add_car():
    data = request.get_json()
    create_vozilo(
        data['user_id'], 
        data['marka'], 
        data['model'], 
        data['potrosnja'], 
        data['cena_goriva'],
        data.get('registracija', '')
    )
    return jsonify({"message": "Vozilo dodato"}), 201

@vozila_bp.route('/api/vozila/<int:vozilo_id>', methods=['DELETE'])
def remove_car(vozilo_id):
    delete_vozilo(vozilo_id)
    return jsonify({"message": "Vozilo obrisano"}), 200