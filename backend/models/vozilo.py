import sqlite3

def create_vozilo(user_id, marka, model, potrosnja, cena_goriva, registracija):
    conn = sqlite3.connect('baza.db')
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO vozila (user_id, marka, model, potrosnja, cena_goriva, registracija)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (user_id, marka, model, potrosnja, cena_goriva, registracija))
    conn.commit()
    conn.close()
    return True

def get_vozila_by_user(user_id):
    conn = sqlite3.connect('baza.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM vozila WHERE user_id = ?', (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def delete_vozilo(vozilo_id):
    conn = sqlite3.connect('baza.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM vozila WHERE id = ?', (vozilo_id,))
    conn.commit()
    conn.close()
    return True