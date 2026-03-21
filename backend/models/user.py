from .db import get_db_connection

def create_user(username, password):
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO korisnici (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        return True
    except:
        return False
    finally:
        conn.close()

def get_user(username, password):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM korisnici WHERE username = ? AND password = ?', (username, password)).fetchone()
    conn.close()
    return user