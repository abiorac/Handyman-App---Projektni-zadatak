from flask_sqlalchemy import SQLAlchemy

# Inicijalizujemo prazan SQLAlchemy objekat.
# Ovaj objekat ('db') ćemo uvoziti u ostale fajlove kako bismo pričali sa bazom.
db = SQLAlchemy()

# ------------------------------------------------------------------
# DEFINICIJA MODELA (TABELA)
# ------------------------------------------------------------------
# Umesto pisanja SQL-a (CREATE TABLE), ovde pravimo Python klase.
# Svaka klasa nasleđuje 'db.Model' što joj omogućava komunikaciju sa bazom.

class Korisnik(db.Model):
    __tablename__ = 'korisnici' 
    
    # Definicija kolona
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    
    # relationship: Ovo nam omogućava da kucamo npr. 'korisnik.vozila' i da dobijemo sva njegova vozila
    vozila = db.relationship('Vozilo', backref='vlasnik', lazy=True)
    popravke = db.relationship('Popravka', backref='vlasnik', lazy=True)

class Vozilo(db.Model):
    __tablename__ = 'vozila'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # Spoljni ključ koji pokazuje na korisnika
    user_id = db.Column(db.Integer, db.ForeignKey('korisnici.id'), nullable=False) 
    
    marka = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    potrosnja = db.Column(db.Float)
    cena_goriva = db.Column(db.Float)
    registracija = db.Column(db.String(20))
    
    popravke = db.relationship('Popravka', backref='vozilo', lazy=True)

class Popravka(db.Model):
    __tablename__ = 'popravke'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('korisnici.id'), nullable=False)
    opis = db.Column(db.Text, nullable=False)
    
    # Popravka uvek zahteva vozilo zbog prevoza alata na lokaciju i računanja troška goriva
    vozilo_id = db.Column(db.Integer, db.ForeignKey('vozila.id'), nullable=False) 
    
    km = db.Column(db.Float)
    zarada = db.Column(db.Float)
    dodatni_trosak = db.Column(db.Float)
    datum = db.Column(db.String(50))
    profit = db.Column(db.Float)