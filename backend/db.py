from flask_sqlalchemy import SQLAlchemy
from open_alchemy import init_yaml
import os

# Inicijalizujemo SQLAlchemy objekat (isti kao pre)
db = SQLAlchemy()

# Putanja do openapi.yaml fajla koji OpenAlchemy čita
SPEC_DIR = os.path.dirname(os.path.abspath(__file__))
SPEC_FILE = os.path.join(SPEC_DIR, "static", "openapi.yaml")

# Putanja gde će OpenAlchemy sačuvati generisani models.py
MODELS_FILENAME = os.path.join(SPEC_DIR, "models.py")

# OpenAlchemy čita openapi.yaml i na osnovu x- atributa generiše SQLAlchemy modele.
# base=db.Model znači da generisane klase nasleđuju naš SQLAlchemy objekat.
init_yaml(SPEC_FILE, base=db.Model, models_filename=MODELS_FILENAME)
