from flask import Flask
from flask_cors import CORS
from models.db import init_db
from routes.auth import auth_bp
from routes.vozila import vozila_bp
from routes.popravke import popravke_bp

app = Flask(__name__)
CORS(app)

# Kreira tabele ako ne postoje
init_db()

# Registracija svih Blueprint-ova
app.register_blueprint(auth_bp)
app.register_blueprint(vozila_bp)
app.register_blueprint(popravke_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)