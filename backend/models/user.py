from .db import db, Korisnik

def create_user(username, password):
    try:
        # Umesto INSERT INTO, ovde kre Python objekat
        novi_korisnik = Korisnik(username=username, password=password)
        
        # Dodajemo kreiranog korisnika u bazu
        db.session.add(novi_korisnik)
        
        # Čuvamo u bazu (SQLAlchemy ovde prevodi objekat u Postgres SQL)
        db.session.commit()
        return True
    except Exception as e:
        # Ako dođe do greške (npr. 'username' već postoji, jer je unique=True), poništi transakciju
        db.session.rollback()
        return False

def get_user(username, password):
    # Umesto SELECT * FROM korisnici WHERE..., koristimo metodu filter_by
    user = Korisnik.query.filter_by(username=username, password=password).first()
    
    # Ako korisnik postoji, vraćamo ga u obliku rečnika.
    # Ovo radimo da ne bismo morali da prepravljamo fajl routes/auth.py koji je naučio da prima rečnik.
    if user:
        return {
            "id": user.id,
            "username": user.username,
            "password": user.password
        }
    return None