"""
Tests pour les modèles Pydantic.

Ce module contient les tests unitaires des modèles User, Product et Order
avec différents scénarios de validation et de création d'instances.
Utiliser pytest pour exécuter les tests : pytest tests/
"""
import pytest
from pydantic import ValidationError
from src.models.user import User, Product, Order
from datetime import datetime


class TestUser:
    """Tests pour le modèle User.
    
    Valide la création d'instances User avec données valides et invalides,
    teste les validations personnalisées et le support des champs optionnels.
    """

    def test_create_valid_user(self):
        """Test de création d'un utilisateur valide.
        
        Crée une instance User avec tous les champs fournis et valides.
        """
        user = User(
            name="Salah",
            email="salah@example.com",
            account_id=12345,
            age=25
        )
        # Vérifier que les attributs ont les bonnes valeurs
        assert user.name == "Salah"
        assert user.email == "salah@example.com"
        assert user.account_id == 12345
        assert user.age == 25

    def test_create_user_from_dict(self):
        """Test de création à partir d'un dictionnaire.
        
        Crée une instance User en déballant un dictionnaire avec l'opérateur **.
        """
        user_data = {
            'name': 'Ali',
            'email': 'ali@example.com',
            'account_id': 999,
            'age': 30
        }
        # Créer l'utilisateur à partir du dictionnaire
        user = User(**user_data)
        # Vérifier les attributs principaux
        assert user.name == "Ali"
        assert user.account_id == 999

    def test_invalid_email(self):
        """Test avec un email invalide.
        
        Vérifie que Pydantic rejette un format d'email incorrect.
        """
        # EmailStr doit lever une ValidationError pour un email mal formé
        with pytest.raises(ValidationError):
            User(name="Test", email="invalid-email", account_id=1)

    def test_negative_account_id(self):
        """Test avec un account_id négatif.
        
        Valide que le validateur personnalisé rejette les account_id négatifs.
        """
        # Le validateur refuse les valeurs <= 0
        with pytest.raises(ValidationError):
            User(name="Test", email="test@example.com", account_id=-5)

    def test_zero_account_id(self):
        """Test avec un account_id égal à zéro.
        
        Valide que le validateur refuse account_id = 0 (non positif).
        """
        # Le validateur refuse account_id <= 0
        with pytest.raises(ValidationError):
            User(name="Test", email="test@example.com", account_id=0)

    def test_invalid_account_id_type(self):
        """Test avec un mauvais type pour account_id.
        
        Vérifie que Pydantic rejette une string au lieu d'un int.
        """
        # Pydantic doit rejeter un type non compatible
        with pytest.raises(ValidationError):
            User(name="Test", email="test@example.com", account_id="not-a-number")

    def test_optional_age_none(self):
        """Test avec age=None (valeur optionnelle).
        
        Crée un User sans fournir l'âge (champ optionnel).
        """
        user = User(
            name="Test",
            email="test@example.com",
            account_id=1,
            age=None
        )
        # L'âge doit être None
        assert user.age is None

    def test_invalid_age_negative(self):
        """Test avec un âge négatif.
        
        Valide que le validateur rejette les âges négatifs.
        """
        # Le validateur refuse age < 0
        with pytest.raises(ValidationError):
            User(name="Test", email="test@example.com", account_id=1, age=-5)

    def test_invalid_age_too_old(self):
        """Test avec un âge trop élevé.
        
        Valide que le validateur rejette les âges > 150.
        """
        # Le validateur refuse age > 150
        with pytest.raises(ValidationError):
            User(name="Test", email="test@example.com", account_id=1, age=200)


class TestProduct:
    """Tests pour le modèle Product.
    
    Valide la création d'instances Product avec données valides et invalides,
    teste les validations personnalisées des prix et quantités.
    """

    def test_create_valid_product(self):
        """Test de création d'un produit valide.
        
        Crée une instance Product avec tous les champs fournis et valides.
        """
        product = Product(name="Laptop", price=999.99, quantity=1)
        # Vérifier que les attributs ont les bonnes valeurs
        assert product.name == "Laptop"
        assert product.price == 999.99
        assert product.quantity == 1

    def test_invalid_price(self):
        """Test avec un prix négatif.
        
        Valide que le validateur rejette les prix <= 0.
        """
        # Le validateur refuse les prix négatifs
        with pytest.raises(ValidationError):
            Product(name="Test", price=-10.0)

    def test_invalid_quantity(self):
        """Test avec une quantité négative.
        
        Valide que le validateur rejette les quantités <= 0.
        """
        # Le validateur refuse les quantités négatives
        with pytest.raises(ValidationError):
            Product(name="Test", price=10.0, quantity=-1)

    def test_default_quantity(self):
        """Test avec la quantité par défaut.
        
        Crée un Product sans spécifier quantity et vérifie qu'il utilise la valeur par défaut (1).
        """
        # La quantité par défaut doit être 1
        product = Product(name="Test", price=10.0)
        assert product.quantity == 1


class TestOrder:
    """Tests pour le modèle Order.
    
    Valide la création d'instances Order avec des clients et produits imbriqués,
    teste le calcul du montant total et les validations des order_id.
    """

    def test_create_valid_order(self):
        """Test de création d'une commande valide.
        
        Crée une commande avec un client valide et une liste de produits,
        puis vérifie l'intégrité de tous les champs.
        """
        # Créer un client User valide
        customer = User(
            name="Ahmed",
            email="ahmed@example.com",
            account_id=1001
        )
        # Créer une liste de produits valides
        products = [
            Product(name="Laptop", price=999.99),
            Product(name="Mouse", price=29.99, quantity=2)
        ]
        # Créer une commande avec le client et les produits
        order = Order(order_id=5001, customer=customer, products=products)

        # Vérifier que la commande a été créée correctement
        assert order.order_id == 5001
        assert order.customer.name == "Ahmed"
        assert len(order.products) == 2
        # Vérifier que le calcul du total est correct
        assert order.total_amount() == 999.99 + (29.99 * 2)

    def test_total_amount(self):
        """Test du calcul du montant total.
        
        Crée une commande avec plusieurs produits et quantités variables,
        puis vérifie que le total est calculé correctement.
        """
        # Créer un client
        customer = User(
            name="Test",
            email="test@example.com",
            account_id=1
        )
        # Créer des produits avec quantités différentes
        products = [
            Product(name="Item1", price=10.0, quantity=2),
            Product(name="Item2", price=15.0, quantity=3)
        ]
        # Créer la commande
        order = Order(order_id=1, customer=customer, products=products)
        # Vérifier le calcul : (10.0 * 2) + (15.0 * 3) = 20 + 45 = 65
        assert order.total_amount() == (10.0 * 2) + (15.0 * 3)

    def test_invalid_order_id(self):
        """Test avec un order_id invalide"""
        customer = User(
            name="Test",
            email="test@example.com",
            account_id=1
        )
        with pytest.raises(ValidationError):
            Order(order_id=-1, customer=customer, products=[])


class TestJsonSerialization:
    """Tests pour la sérialisation JSON"""

    def test_model_dump_json(self):
        """Test de sérialisation en JSON"""
        user = User(
            name="Test",
            email="test@example.com",
            account_id=1,
            age=25
        )
        json_str = user.model_dump_json()
        assert '"name":"Test"' in json_str
        assert '"email":"test@example.com"' in json_str

    def test_model_dump(self):
        """Test de conversion en dictionnaire"""
        user = User(
            name="Test",
            email="test@example.com",
            account_id=1,
            age=25
        )
        data = user.model_dump()
        assert isinstance(data, dict)
        assert data['name'] == "Test"
        assert data['age'] == 25
