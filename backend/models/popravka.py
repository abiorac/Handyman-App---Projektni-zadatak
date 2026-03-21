from .db import get_db_connection

def sacuvaj_popravku(user_id, data):
    conn = get_db_connection()
    conn.execute('''INSERT INTO popravke 
        (user_id, opis, vozilo_id, km, zarada, dodatni_trosak, datum, profit) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
        (user_id, data['opis'], data['voziloId'], data['km'], data['zarada'], 
         data['dodatniTrosak'], data['datum'], data['profit']))
    conn.commit()
    conn.close()

def get_popravke_korisnika(user_id):
    conn = get_db_connection()
    popravke = conn.execute('SELECT * FROM popravke WHERE user_id = ?', (user_id,)).fetchall()
    conn.close()
    return [dict(p) for p in popravke]