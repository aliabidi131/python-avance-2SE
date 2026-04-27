# TP1 - Pydantic : Validation de Données en Python

## Description

Ce projet est un exemple complet d'utilisation de **Pydantic** pour la validation de données en Python. Il démontre tous les concepts du cours : `BaseModel`, validation, `EmailStr`, `field_validator`, sérialisation JSON, et comparaison avec les `dataclasses`.

## Structure du Projet

```
TP1_Pydantic/
├── src/
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py         # Modèles Pydantic (User, Product, Order)
│   ├── validators/
│   │   ├── __init__.py
│   │   └── custom_validators.py
│   └── main.py             # Exemples d'exécution
├── tests/
│   ├── __init__.py
│   └── test_models.py      # Tests avec pytest
├── requirements.txt        # Dépendances
└── README.md
```

## Concepts Couverts

### 1. BaseModel
- Création de modèles héritant de `BaseModel`
- Typage des attributs
- Création d'objets à partir de paramètres ou dictionnaire

### 2. Validation des Données
- Validation automatique des types
- `EmailStr` pour la validation d'emails
- Messages d'erreur clairs avec `ValidationError`

### 3. Validators Personnalisés
- Utilisation de `@field_validator`
- Validation de valeurs positives, plages de valeurs

### 4. Sérialisation JSON
- `model_dump_json()` pour convertir en JSON
- `model_dump()` pour convertir en dictionnaire
- Désérialisation à partir de dictionnaire

### 5. Comparaison Pydantic vs Dataclasses
- Pydantic : validation automatique, sérialisation intégrée
- Dataclasses : built-in, pas de validation automatique

## Installation

### Prérequis
- Python 3.8+

### Étapes

1. Cloner le repository
```bash
git clone <repo-url>
cd TP1_Pydantic
```

2. Créer un environnement virtuel (recommandé)
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

3. Installer les dépendances
```bash
pip install -r requirements.txt
```

## Utilisation

### Exécuter les démonstrations
```bash
python -m src.main
```

### Exécuter les tests
```bash
pytest tests/
```

Pour un affichage détaillé :
```bash
pytest -v tests/
```

## Exemples

### Création d'un utilisateur
```python
from src.models.user import User

user = User(
    name="Salah",
    email="salah@example.com",
    account_id=12345,
    age=25
)
print(user)
```

### Gestion des erreurs de validation
```python
from pydantic import ValidationError

try:
    user = User(name="Ali", email="invalid", account_id=-5)
except ValidationError as e:
    print(f"Erreur: {e}")
```

### Sérialisation JSON
```python
user_json = user.model_dump_json()
user_dict = user.model_dump()
```

## Dépendances

- `pydantic` - Library de validation de données
- `email-validator` - Validation d'emails (requis par Pydantic)
- `pytest` - Framework de tests

## Auteur

D'après le cours de **Wahid Hamdi** - Pydantic Tutorial

## Licence

Projet académique - TP Python Avancé 2SE
