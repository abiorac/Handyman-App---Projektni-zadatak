import sqlite3

def get_db_connection():
    conn = sqlite3.connect('baza.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    # Tabela korisnika
    cursor.execute('''CREATE TABLE IF NOT EXISTS korisnici (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL)''')
    # Tabela vozila
    cursor.execute('''CREATE TABLE IF NOT EXISTS vozila (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        marka TEXT NOT NULL,
        model TEXT NOT NULL,
        potrosnja REAL,
        cena_goriva REAL,
        registracija TEXT,
        FOREIGN KEY (user_id) REFERENCES korisnici (id))''')
    # Tabela popravki
    cursor.execute('''CREATE TABLE IF NOT EXISTS popravke (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        opis TEXT NOT NULL,
        vozilo_id INTEGER,
        km REAL,
        zarada REAL,
        dodatni_trosak REAL,
        datum TEXT,
        profit REAL,
        FOREIGN KEY (user_id) REFERENCES korisnici (id))''')
    conn.commit()
    conn.close()