# TP3 - FastAPI : Création d'une API de Gestion de Tâches

## Objectif du TP

Créer une API REST avec FastAPI pour gérer une liste de tâches (to-do list), en appliquant les concepts vus dans le cours.

## Prérequis

- Python installé
- Connaissance de base de HTTP (GET, POST)

---

## Exercice 1 : Installation et Configuration (2 points)

### 1.1 Installation des dépendances

Installer FastAPI et Uvicorn :

```bash
pip install fastapi uvicorn
```

### 1.2 Création du projet

Créer un fichier `main.py` avec le code de base :

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"Hello": "World"}
```

### 1.3 Lancement du serveur

Lancer le serveur avec :

```bash
uvicorn main:app --reload
```

Vérifier que l'API est accessible à `http://127.0.0.1:8000`.

---

## Exercice 2 : Routes GET et POST (3 points)

### 2.1 Initialisation de la liste de tâches

Créer une liste vide pour stocker les tâches :

```python
items = []
```

### 2.2 Route POST pour créer une tâche

Créer un endpoint `POST /items` qui accepte un paramètre de requête `item` (str) et l'ajoute à la liste.

### 2.3 Route GET pour afficher une tâche

Créer un endpoint `GET /items/{item_id}` qui retourne la tâche à l'index `item_id`.

### Tests à effectuer

```bash
curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:8000/items?item=apple'
curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:8000/items?item=orange'
curl -X GET http://127.0.0.1:8000/items/0
curl -X GET http://127.0.0.1:8000/items/1
```

---

## Exercice 3 : Gestion des Erreurs HTTP (3 points)

### 3.1 Import de HTTPException

Importer `HTTPException` depuis FastAPI :

```python
from fastapi import FastAPI, HTTPException
```

### 3.2 Gestion du 404

Modifier la route `GET /items/{item_id}` pour gérer le cas où l'item n'existe pas (retourner une erreur 404 avec un message explicite).

### Tests à effectuer

```bash
curl -X GET http://127.0.0.1:8000/items/7
```

Vérifier que la réponse est :

```json
{"detail": "Item 7 not found"}
```

---

## Exercice 4 : Paramètres JSON et Query Parameters (2 points)

### 4.1 Route avec paramètre de requête

Créer un endpoint `GET /items/` avec un paramètre `limit` (int, valeur par défaut 10) qui retourne les `limit` premières tâches.

### Tests à effectuer

```bash
curl -X GET 'http://127.0.0.1:8000/items?limit=3'
```

---

## Exercice 5 : Modèles Pydantic (4 points)

### 5.1 Import et définition du modèle

Importer `BaseModel` depuis Pydantic et définir un modèle `Item` avec :
- `text` : str (obligatoire)
- `is_done` : bool (optionnel, valeur par défaut False)

```python
from pydantic import BaseModel

class Item(BaseModel):
    text: str
    is_done: bool = False
```

### 5.2 Mise à jour des routes

- Modifier `POST /items` pour accepter un JSON avec le modèle `Item`
- Modifier `GET /items/{item_id}` pour retourner un `Item`

### Tests à effectuer

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"apple"}' 'http://127.0.0.1:8000/items'
curl -X POST -H "Content-Type: application/json" -d '{"text":"banana", "is_done": true}' 'http://127.0.0.1:8000/items'
```

Vérifier que la réponse est un JSON avec `text` et `is_done`.

---

## Exercice 6 : Modèles de Réponse (3 points)

### 6.1 Définition du response_model

Ajouter le paramètre `response_model` aux endpoints :

- `GET /items` → `response_model=list[Item]`
- `GET /items/{item_id}` → `response_model=Item`

### Tests à effectuer

```bash
curl -X GET http://127.0.0.1:8000/items
```

Vérifier que la réponse est un tableau d'objets `Item`.

---

## Exercice 7 : Documentation Interactive (1 point)

### 7.1 Accéder à la documentation

Ouvrir les URLs suivantes dans un navigateur :

- Swagger UI : `http://127.0.0.1:8000/docs`
- ReDoc : `http://127.0.0.1:8000/redoc`

### 7.2 Tester via la documentation

Utiliser Swagger UI pour tester les endpoints créés.

---

## Structure Finale du Projet

```
TP3_FastAPI/
├── main.py          # Code de l'application FastAPI
└── README.md        # Documentation du TP
```

---

## Lancement du Projet

1. Ouvrir un terminal dans le dossier `TP3_FastAPI`
2. Lancer le serveur : `uvicorn main:app --reload`
3. Tester l'API via :
   - `curl` en ligne de commande
   - Interface Swagger : http://127.0.0.1:8000/docs
   - Interface ReDoc : http://127.0.0.1:8000/redoc

---

## Évaluation

| Exercice | Points |
|----------|--------|
| Exercice 1 | 2 pts |
| Exercice 2 | 3 pts |
| Exercice 3 | 3 pts |
| Exercice 4 | 2 pts |
| Exercice 5 | 4 pts |
| Exercice 6 | 3 pts |
| Exercice 7 | 1 pt |
| **Total** | **18 pts** |