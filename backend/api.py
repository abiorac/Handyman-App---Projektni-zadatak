import db as database
import models


# ------------------------------------------------------------------
# AUTENTIFIKACIJA
# ------------------------------------------------------------------

def register(body):
    """Registracija novog korisnika"""
    try:
        novi_korisnik = models.Korisnik.from_dict(
            username=body.get('username'),
            password=body.get('password')
        )
        database.db.session.add(novi_korisnik)
        database.db.session.commit()
        return {"message": "Uspešna registracija"}, 201
    except Exception as e:
        database.db.session.rollback()
        return {"error": "Korisničko ime je već zauzeto"}, 400


def login(body):
    """Prijava korisnika — proverava korisničko ime i lozinku"""
    user = models.Korisnik.query.filter_by(
        username=body.get('username'),
        password=body.get('password')
    ).first()
    if user:
        return {"id": user.id, "username": user.username}, 200
    return {"error": "Pogrešno korisničko ime ili lozinka"}, 401


# ------------------------------------------------------------------
# VOZILA
# ------------------------------------------------------------------

def addVozilo(body):
    """Dodavanje novog vozila"""
    try:
        novo_vozilo = models.Vozilo.from_dict(
            user_id=body.get('user_id'),
            marka=body.get('marka'),
            model=body.get('model'),
            potrosnja=body.get('potrosnja'),
            cena_goriva=body.get('cena_goriva'),
            registracija=body.get('registracija', '')
        )
        database.db.session.add(novo_vozilo)
        database.db.session.commit()
        return {"message": "Vozilo dodato"}, 201
    except Exception as e:
        database.db.session.rollback()
        return {"error": "Greška pri dodavanju vozila"}, 400


def getVozila(id):
    """Vraća lista svih vozila za datog korisnika (id = user_id)"""
    vozila = models.Vozilo.query.filter_by(user_id=id).all()
    return [v.to_dict() for v in vozila], 200


def deleteVozilo(id):
    """Briše vozilo po ID-u vozila"""
    try:
        vozilo = models.Vozilo.query.get(id)
        if vozilo:
            database.db.session.delete(vozilo)
            database.db.session.commit()
        return {"message": "Vozilo obrisano"}, 200
    except Exception as e:
        database.db.session.rollback()
        return {"error": "Greška pri brisanju vozila"}, 400


# ------------------------------------------------------------------
# POPRAVKE
# ------------------------------------------------------------------

def addPopravka(body):
    """Čuvanje nove popravke (servis klime, bojlera, itd.)"""
    try:
        # Frontend šalje voziloId i dodatniTrosak (camelCase)
        # Mapiramo ih na snake_case koji koristi baza
        nova_popravka = models.Popravka.from_dict(
            user_id=body.get('user_id'),
            opis=body.get('opis'),
            vozilo_id=body.get('voziloId'),
            km=body.get('km', 0),
            zarada=body.get('zarada', 0),
            dodatni_trosak=body.get('dodatniTrosak', 0),
            datum=body.get('datum'),
            profit=body.get('profit', 0)
        )
        database.db.session.add(nova_popravka)
        database.db.session.commit()
        return {"message": "Popravka sačuvana"}, 201
    except Exception as e:
        database.db.session.rollback()
        return {"error": "Greška pri čuvanju popravke"}, 400


def getPopravke(user_id):
    """Vraća listu svih popravki za datog korisnika"""
    popravke = models.Popravka.query.filter_by(user_id=user_id).all()
    return [p.to_dict() for p in popravke], 200
