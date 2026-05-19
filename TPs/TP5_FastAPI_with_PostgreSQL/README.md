# FastAPI Quiz Application

## Description du projet

Application web de quiz construite avec FastAPI et SQLite. L'application permet de créer des questions avec des choix multiples, et de récupérer les questions et leurs réponses via une API REST.

## Installation des dépendances

1. Créer un environnement virtuel :
```bash
python -m venv myenv
```

2. Activer l'environnement virtuel :
- Windows : `myenv\Scripts\activate`
- Linux/Mac : `source myenv/bin/activate`

3. Installer les dépendances :
```bash
pip install -r requirements.txt
```

## Instructions pour exécuter le projet

1. Démarrer le serveur FastAPI :
```bash
uvicorn main:app --reload
```

2. Accéder à la documentation Swagger UI :
```
http://127.0.0.1:8000/docs
```

## Exemple d'utilisation

### Ajouter une question (POST /questions/)

Corps de la requête :
```json
{
  "question_text": "What is the best Python Framework",
  "choices": [
    {"choice_text": "FastAPI", "is_correct": true},
    {"choice_text": "Flask", "is_correct": false},
    {"choice_text": "Django", "is_correct": false}
  ]
}
```

### Récupérer une question (GET /questions/{question_id})

### Récupérer les choix d'une question (GET /choices/{question_id})

## Remarque

Le projet utilise SQLite par défaut (`quizApp.db`). Pour utiliser PostgreSQL, modifier `database.py` :
```python
URL_DATABASE = 'postgresql://USERNAME:PASSWD@localhost:5432/quizApp'
```