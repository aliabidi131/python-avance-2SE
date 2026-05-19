import os
os.environ['PGCLIENTENCODING'] = 'UTF8'

import psycopg

try:
    conn = psycopg.connect(
        host="localhost",
        port="5432",
        user="postgres",
        password="2618018",
        dbname="quizApp"
    )
    print("Connexion réussie à PostgreSQL!")
    conn.close()
except Exception as e:
    print(f"Erreur: {e}")