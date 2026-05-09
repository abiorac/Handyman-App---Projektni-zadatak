from .db import db, Popravka

def sacuvaj_popravku(user_id, data):
    try:
        # Prikupljamo podatke iz zahteva (dictionary 'data')
        opis = data.get('opis')
        vozilo_id = data.get('voziloId')
        km = data.get('km', 0)
        zarada = float(data.get('zarada', 0))
        trosak = float(data.get('dodatniTrosak', 0))
        datum = data.get('datum')
        profit = float(data.get('profit', 0))
        
        # Kreiramo objekat nove popravke
        nova_popravka = Popravka(
            user_id=user_id,
            opis=opis,
            vozilo_id=vozilo_id,
            km=km,
            zarada=zarada,
            dodatni_trosak=trosak,
            datum=datum,
            profit=profit
        )
        
        # Čuvanje novih popravki u bazi
        db.session.add(nova_popravka)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

def get_popravke_korisnika(user_id):
    # Pronalazimo sve popravke za datog korisnika
    popravke = Popravka.query.filter_by(user_id=user_id).all()
    
    # Kreiramo listu popravki koje će biti poslate
    lista_popravki = []
    for p in popravke:
        lista_popravki.append({
            "id": p.id,
            "user_id": p.user_id,
            "opis": p.opis,
            "vozilo_id": p.vozilo_id,
            "km": p.km,
            "zarada": p.zarada,
            "dodatni_trosak": p.dodatni_trosak,
            "datum": p.datum,
            "profit": p.profit
        })
    return lista_popravki