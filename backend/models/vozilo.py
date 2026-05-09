from .db import db, Vozilo

def create_vozilo(user_id, marka, model, potrosnja, cena_goriva, registracija):
    try:
        # Pravimo objekat vozila
        novo_vozilo = Vozilo(
            user_id=user_id, 
            marka=marka, 
            model=model, 
            potrosnja=potrosnja, 
            cena_goriva=cena_goriva, 
            registracija=registracija
        )
        # Dodajemo vozilo u bazu
        db.session.add(novo_vozilo)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

def get_vozila_by_user(user_id):
    # Pronalazimo sva vozila koja pripadaju datom korisniku
    vozila = Vozilo.query.filter_by(user_id=user_id).all()
    
    # Kreiramo listu vozila koju vraćamo frontendu
    lista_vozila = []
    for v in vozila:
        lista_vozila.append({
            "id": v.id,
            "user_id": v.user_id,
            "marka": v.marka,
            "model": v.model,
            "potrosnja": v.potrosnja,
            "cena_goriva": v.cena_goriva,
            "registracija": v.registracija
        })
    return lista_vozila

def delete_vozilo(vozilo_id):
    try:
        # Nalazimo vozilo preko primary key (id)
        vozilo = Vozilo.query.get(vozilo_id)
        if vozilo:
            db.session.delete(vozilo)
            db.session.commit()
        return True
    except:
        db.session.rollback()
        return False