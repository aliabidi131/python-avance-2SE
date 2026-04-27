"""
TP1 Pydantic - Exemples d'execution
"""
from src.models.user import User, Product, Order
from pydantic import ValidationError


def demo_basemodel():
    """Démontre la création et l'utilisation basique d'un modèle BaseModel.
    
    Crée une instance User avec des données valides et affiche les attributs.
    """
    print("=" * 60)
    print("1. DEMONSTRATION DE BASEMODEL")
    print("=" * 60)

    # Créer une instance User avec des données valides
    user = User(
        name="Salah",
        email="salah@example.com",
        account_id=12345,
        age=25
    )
    print(f"User cree avec succes :")
    print(f"  - name: {user.name}")
    print(f"  - email: {user.email}")
    print(f"  - account_id: {user.account_id}")
    print(f"  - age: {user.age}")
    print()


def demo_validation():
    """Démontre les mécanismes de validation automatiques de Pydantic.
    
    Teste divers scénarios d'erreurs de validation (type, format, valeurs invalides)
    et affiche les messages d'erreur correspondants.
    """
    print("=" * 60)
    print("2. DEMONSTRATION DE LA VALIDATION")
    print("=" * 60)

    # Test 1: account_id avec mauvais type (string au lieu d'int)
    try:
        user = User(name="Ali", email="ali@example.com", account_id="hello")
    except ValidationError as e:
        print(f"Erreur (account_id invalide) : {e}")
    print()

    # Test 2: email invalide (format incorrect)
    try:
        user = User(name="Ali", email="ali", account_id=1234)
    except ValidationError as e:
        print(f"Erreur (email invalide) : {e}")
    print()

    # Test 3: account_id négatif (validation personnalisée)
    try:
        user = User(name="Ali", email="ali@example.com", account_id=-12)
    except ValidationError as e:
        print(f"Erreur (account_id negatif) : {e}")
    print()


def demo_json():
    """Démontre la sérialisation des modèles en dictionnaire et JSON.
    
    Affiche les différents formats de sérialisation d'une instance User.
    """
    print("=" * 60)
    print("3. SERIALISATION JSON")
    print("=" * 60)

    # Créer une instance User valide
    user = User(name="Ali", email="ali@example.com", account_id=1234, age=30)
    print(f"Original: {user}")
    # Sérialiser en JSON
    print(f"JSON: {user.model_dump_json()}")
    # Sérialiser en dictionnaire Python
    print(f"Dict: {user.model_dump()}")
    print()


def demo_order():
    """Démontre l'utilisation de modèles imbriqués complexes.
    
    Crée une commande contenant un client (User) et une liste de produits,
    puis calcule et affiche le montant total de la commande.
    """
    print("=" * 60)
    print("4. MODELE COMPLEXE (ORDER)")
    print("=" * 60)

    # Créer un client User
    customer = User(name="Ahmed", email="ahmed@example.com", account_id=1001)
    # Créer une liste de produits
    products = [
        Product(name="Laptop", price=999.99, quantity=1),
        Product(name="Mouse", price=29.99, quantity=2),
    ]
    # Créer une commande avec le client et les produits
    order = Order(order_id=5001, customer=customer, products=products)
    # Afficher la commande et calculer le montant total
    print(f"Commande #{order.order_id} - Total: {order.total_amount():.2f}")
    print()


def demo_comparison():
    """Affiche une comparaison entre Pydantic et les dataclasses Python.
    
    Met en évidence l'avantage principal de Pydantic : la validation automatique.
    """
    print("=" * 60)
    print("5. PYDANTIC VS DATACLASSES")
    print("=" * 60)
    # Pydantic effectue la validation automatiquement lors de l'instanciation
    print("Pydantic: validation automatique")
    # Les dataclasses n'ont pas de mécanisme de validation intégré par défaut
    print("Dataclass: pas de validation automatique")
    print()


if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("TP1 PYDANTIC - DEMONSTRATION")
    print("=" * 60 + "\n")

    demo_basemodel()
    demo_validation()
    demo_json()
    demo_order()
    demo_comparison()

    print("=" * 60)
    print("FIN")
    print("=" * 60)
