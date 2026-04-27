# Guide d'Exécution - TP1 Pydantic

## 📋 Table des matières
1. [Installation et Préparation](#installation-et-préparation)
2. [Exécution du Programme Principal](#exécution-du-programme-principal)
3. [Exécution des Tests](#exécution-des-tests)
4. [Exécution par Démonstration](#exécution-par-démonstration)
5. [Dépannage](#dépannage)

---

## 🔧 Installation et Préparation

### Étape 1 : Vérifier la présence de Python
```bash
python --version
# ou
python3 --version
```
**Résultat attendu** : Python 3.8+ installé

### Étape 2 : Créer l'environnement virtuel (si pas déjà créé)
```bash
# Windows
python -m venv venv

# Linux/Mac
python3 -m venv venv
```

### Étape 3 : Activer l'environnement virtuel

**Windows (PowerShell)** :
```bash
.\venv\Scripts\Activate.ps1
```

**Windows (CMD)** :
```bash
.\venv\Scripts\activate.bat
```

**Linux/Mac** :
```bash
source venv/bin/activate
```

### Étape 4 : Installer les dépendances
```bash
pip install -r requirements.txt
```

**Dépendances installées** :
- `pydantic` : Framework de validation de données
- `pytest` : Framework de test unitaire
- `email-validator` : Pour la validation d'emails (EmailStr)

---

## ▶️ Exécution du Programme Principal

### Méthode 1 : Exécution depuis le répertoire racine

```bash
# S'assurer que vous êtes dans le répertoire racine du projet
cd D:\python_avancé_2SE\TPs\TP1_Pydantic

# Exécuter le programme principal
python -m src.main
```

**ou directement** :
```bash
python src/main.py
```

### Sortie Attendue

```
============================================================
TP1 PYDANTIC - DEMONSTRATION
============================================================

============================================================
1. DEMONSTRATION DE BASEMODEL
============================================================
User cree avec succes :
  - name: Salah
  - email: salah@example.com
  - account_id: 12345
  - age: 25

============================================================
2. DEMONSTRATION DE LA VALIDATION
============================================================
Erreur (account_id invalide) : ...
Erreur (email invalide) : ...
Erreur (account_id negatif) : ...

============================================================
3. SERIALISATION JSON
============================================================
...

============================================================
4. MODELE COMPLEXE (ORDER)
============================================================
Commande #5001 - Total: 1059.97

============================================================
5. PYDANTIC VS DATACLASSES
============================================================
Pydantic: validation automatique
Dataclass: pas de validation automatique

============================================================
FIN
============================================================
```

---

## 🧪 Exécution des Tests

### Méthode 1 : Exécuter tous les tests

```bash
# Exécuter tous les tests
pytest tests/
```

ou avec plus de détails :

```bash
pytest tests/ -v
```

### Méthode 2 : Exécuter une classe de tests spécifique

```bash
# Tester la classe User
pytest tests/test_models.py::TestUser -v

# Tester la classe Product
pytest tests/test_models.py::TestProduct -v

# Tester la classe Order
pytest tests/test_models.py::TestOrder -v
```

### Méthode 3 : Exécuter un test spécifique

```bash
# Tester une création d'utilisateur valide
pytest tests/test_models.py::TestUser::test_create_valid_user -v

# Tester la validation d'un email invalide
pytest tests/test_models.py::TestUser::test_invalid_email -v
```

### Méthode 4 : Exécuter avec rapport de couverture

```bash
# Installer pytest-cov
pip install pytest-cov

# Exécuter les tests avec couverture
pytest tests/ --cov=src --cov-report=html
```

### Résumé des Tests

| Test | Classe | Compte |
|------|--------|--------|
| Création valide | TestUser | 9 tests |
| Validation d'email | TestUser | ✓ |
| Validation account_id | TestUser | ✓ |
| Validation age | TestUser | ✓ |
| Création de produit | TestProduct | 3+ tests |
| Validation prix/quantité | TestProduct | ✓ |
| Création de commande | TestOrder | 2 tests |
| Calcul montant total | TestOrder | ✓ |

---

## 🎯 Exécution par Démonstration

### Démonstration 1 : Créer un utilisateur simple

**Fichier** : `demo_user.py` (à créer)

```python
from src.models.user import User

# Créer un utilisateur
user = User(
    name="John Doe",
    email="john@example.com",
    account_id=1001,
    age=28
)

print(f"✓ Utilisateur créé : {user.name}")
print(f"  Email: {user.email}")
print(f"  Account ID: {user.account_id}")
print(f"  Age: {user.age}")
```

**Exécution** :
```bash
python demo_user.py
```

### Démonstration 2 : Tester les validations

**Fichier** : `demo_validation.py` (à créer)

```python
from src.models.user import User
from pydantic import ValidationError

# Test 1: Email invalide
try:
    user = User(name="Test", email="invalid", account_id=1)
except ValidationError as e:
    print(f"✗ Email invalide détecté : {e}")

# Test 2: account_id négatif
try:
    user = User(name="Test", email="test@example.com", account_id=-5)
except ValidationError as e:
    print(f"✗ Account ID invalide détecté : {e}")

# Test 3: Utilisateur valide
try:
    user = User(name="Test", email="test@example.com", account_id=1, age=25)
    print(f"✓ Utilisateur valide : {user.name}")
except ValidationError as e:
    print(f"✗ Erreur : {e}")
```

**Exécution** :
```bash
python demo_validation.py
```

### Démonstration 3 : Sérialisation JSON

**Fichier** : `demo_serialization.py` (à créer)

```python
from src.models.user import User, Product, Order
import json

# Créer un utilisateur
user = User(name="Ali", email="ali@example.com", account_id=100, age=30)

# Sérialiser en dictionnaire
user_dict = user.model_dump()
print("Dict:", user_dict)

# Sérialiser en JSON
user_json = user.model_dump_json(indent=2)
print("\nJSON:\n", user_json)

# Désérialiser depuis JSON
user_from_json = User.model_validate_json(user_json)
print(f"\n✓ Utilisateur désérialisé : {user_from_json.name}")
```

**Exécution** :
```bash
python demo_serialization.py
```

---

## 🏗️ Structure du Projet

```
TP1_Pydantic/
├── venv/                          # Environnement virtuel
├── src/
│   ├── __init__.py
│   ├── main.py                    # Programme principal (démos)
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py               # Modèles Pydantic (User, Product, Order)
│   └── validators/
│       ├── __init__.py
│       └── custom_validators.py  # Validateurs personnalisés
├── tests/
│   ├── __init__.py
│   └── test_models.py            # Tests unitaires
├── requirements.txt              # Dépendances
├── README.md                     # Documentation générale
├── EXECUTION_STEPS.md            # CE FICHIER
└── MappingFile.txt              # Mappage des fichiers
```

---

## 🔍 Commandes Utiles

### Vérifier l'installation
```bash
pip list
# Devrait afficher : pydantic, pytest, email-validator
```

### Exécuter les tests avec filtre
```bash
# Tests qui passent
pytest tests/ -v --tb=short

# Tests avec affichage des prints
pytest tests/ -v -s

# Tests spécifiques aux validations
pytest tests/ -k "invalid" -v
```

### Vérifier les modèles
```bash
# Afficher le schéma d'un modèle
python -c "from src.models.user import User; import json; print(json.dumps(User.model_json_schema(), indent=2))"
```

### Nettoyer les fichiers temporaires
```bash
# Windows
rmdir /s __pycache__
rmdir /s .pytest_cache

# Linux/Mac
find . -type d -name __pycache__ -exec rm -r {} +
find . -type d -name .pytest_cache -exec rm -r {} +
```

---

## ⚠️ Dépannage

### Problème 1 : `ModuleNotFoundError: No module named 'pydantic'`

**Solution** :
```bash
# 1. Vérifier l'activation de l'environnement virtuel
# Devrait afficher (venv) avant le prompt

# 2. Installer les dépendances
pip install -r requirements.txt

# 3. Vérifier l'installation
pip list | grep pydantic
```

### Problème 2 : `ModuleNotFoundError: No module named 'src'`

**Solution** :
```bash
# S'assurer d'être dans le répertoire racine
cd D:\python_avancé_2SE\TPs\TP1_Pydantic

# Vérifier que src/ existe
dir src

# Exécuter depuis le répertoire racine
python -m src.main
```

### Problème 3 : `ValidationError` lors de la création d'utilisateur

**Vérifier** :
```python
# Email invalide
# ✗ Mauvais : "email.com" au lieu de "name@email.com"
# ✓ Correct : "name@email.com"

# account_id négatif ou zéro
# ✗ Mauvais : account_id = -5 ou 0
# ✓ Correct : account_id = 1, 100, 999 (positif)

# age invalide
# ✗ Mauvais : age = -5 ou 200
# ✓ Correct : age = 0 à 150
```

### Problème 4 : Tests échouent

**Commandes de diagnostic** :
```bash
# Exécuter les tests avec traceback complet
pytest tests/ -v --tb=long

# Exécuter un test spécifique
pytest tests/test_models.py::TestUser::test_create_valid_user -vv

# Afficher les prints pendant les tests
pytest tests/ -v -s
```

---

## 📚 Ressources Complémentaires

### Documentation Officielle
- **Pydantic** : https://docs.pydantic.dev/
- **Pytest** : https://docs.pytest.org/

### Concepts Clés

#### Modèles Pydantic
```python
from pydantic import BaseModel, field_validator

class Model(BaseModel):
    field: type
    
    @field_validator('field')
    def validate_field(cls, v):
        # logique de validation
        return v
```

#### Tests Pytest
```python
import pytest

def test_something():
    assert condition == True

def test_exception():
    with pytest.raises(Exception):
        # code qui lève une exception
        pass
```

---

## ✅ Checklist d'Exécution

- [ ] Python 3.8+ installé
- [ ] Environnement virtuel créé et activé
- [ ] Dépendances installées (`pip install -r requirements.txt`)
- [ ] Programme principal exécuté (`python -m src.main`)
- [ ] Tests exécutés (`pytest tests/ -v`)
- [ ] Tous les tests réussissent ✓
- [ ] Code documenté et commenté ✓

---

**Dernière mise à jour** : 27 Avril 2026
**Version** : 1.0
