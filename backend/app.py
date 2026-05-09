import os
from flask import Flask
from flask_cors import CORS
from models.db import db  # Uvozimo naš novi SQLAlchemy 'db' objekat umesto starog init_db
from routes.auth import auth_bp
from routes.vozila import vozila_bp
from routes.popravke import popravke_bp
from flask_swagger_ui import get_swaggerui_blueprint  # Dodat uvoz za Swagger UI

app = Flask(__name__)
CORS(app)

# ---------------------------------------------------------
# NOVA KONFIGURACIJA BAZE (POSTGRES I SQLALCHEMY)
# ---------------------------------------------------------
# Čitamo DATABASE_URL iz Docker okruženja.
# Ako pokrenemo fajl van Dockera, koristiće se ovaj default string. (Connection String)
default_db_url = 'postgresql://handyman_user:handyman_password@db:5432/handyman_db'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', default_db_url)

# Isključujemo praćenje modifikacija jer nam to nije potrebno (ubrzava rad aplikacije)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

# Povezujemo Flask aplikaciju sa SQLAlchemy 'db' objektom
db.init_app(app)

# Umesto starog init_db(), sada kažemo SQLAlchemy-ju da kreira sve tabele iz klasa (ako već ne postoje)
with app.app_context():
    db.create_all()

# ---------------------------------------------------------
# SWAGGER UI KONFIGURACIJA
# ---------------------------------------------------------
SWAGGER_URL = '/api/docs'  # Putanja na kojoj će se prikazivati dokumentacija u brauzeru
API_URL = '/static/openapi.yaml'  # Putanja gde će Swagger tražiti naš tekstualni fajl

# Pravimo novi blueprint specijalno za Swagger
swaggerui_bp = get_swaggerui_blueprint(
    SWAGGER_URL,  
    API_URL,
    config={  # Opciona podešavanja prozora
        'app_name': "Handyman App - API Dokumentacija"
    }
)

# Registracija svih Blueprint-ova
app.register_blueprint(auth_bp)
app.register_blueprint(vozila_bp)
app.register_blueprint(popravke_bp)
app.register_blueprint(swaggerui_bp, url_prefix=SWAGGER_URL) # Registrujemo Swagger prozor

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)