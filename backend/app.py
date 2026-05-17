import os
import connexion
from starlette.middleware.cors import CORSMiddleware
from connexion.middleware import MiddlewarePosition
import db

# Connexion čita openapi.yaml iz 'static' foldera i automatski rutira
# zahteve ka funkcijama u api.py na osnovu operationId polja
app = connexion.FlaskApp(__name__, specification_dir="static")

# Dodajemo CORS middleware za Connexion 3 (ASGI)
app.add_middleware(
    CORSMiddleware,
    position=MiddlewarePosition.BEFORE_ROUTING,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Konfiguracija baze podataka (isti connection string kao pre)
default_db_url = 'postgresql://handyman_user:handyman_password@db:5432/handyman_db'
app.app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', default_db_url)
app.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Povezujemo SQLAlchemy sa Flask aplikacijom
db.db.init_app(app.app)

# Kreiramo sve tabele u bazi 
with app.app.app_context():
    db.db.create_all()

# Učitavamo openapi.yaml — connexion čita operationId i vezuje rute za api.py funkcije
# Swagger UI je automatski dostupan na: http://localhost:5000/ui/  
app.add_api(
    "openapi.yaml",
    arguments={"title": "Handyman App API"},
    strict_validation=True
)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)