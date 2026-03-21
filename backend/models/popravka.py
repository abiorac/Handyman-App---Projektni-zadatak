from .db import get_db_connection

def sacuvaj_popravku(user_id, data):
    conn = get_db_connection()
    
    # Izvlačimo podatke koristeći nazive koje šalje frontend (iz handleSave)
    opis = data.get('opis')
    vozilo_id = data.get('voziloId')
    km = data.get('km', 0)
    zarada = float(data.get('zarada', 0))
    # Ovde hvatamo 'dodatniTrosak' koji je na frontendu već sabran sa gorivom
    trosak = float(data.get('dodatniTrosak', 0))
    datum = data.get('datum')
    profit = float(data.get('profit', 0))

    conn.execute('''INSERT INTO popravke 
        (user_id, opis, vozilo_id, km, zarada, dodatni_trosak, datum, profit) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
        (user_id, opis, vozilo_id, km, zarada, trosak, datum, profit))
    
    conn.commit()
    conn.close()

def get_popravke_korisnika(user_id):
    conn = get_db_connection()
    # SELECT * uzima sve kolone uključujući 'profit' i 'dodatni_trosak'
    popravke = conn.execute('SELECT * FROM popravke WHERE user_id = ?', (user_id,)).fetchall()
    conn.close()
    return [dict(p) for p in popravke]