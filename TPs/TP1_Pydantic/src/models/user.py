"""
Modèles Pydantic - Démonstration des concepts du cours
"""
from pydantic import BaseModel, EmailStr, field_validator, ValidationError
from typing import List, Optional
from datetime import datetime


class User(BaseModel):
    """Modèle User démontrant les concepts de base de Pydantic.
    
    Représente un utilisateur avec ses informations de base et account_id.
    Inclut des validations personnalisées pour account_id et age.
    
    Attributes:
        name: Nom complet de l'utilisateur.
        email: Adresse email valide (validée par EmailStr).
        account_id: Identifiant numérique unique du compte.
        age: Âge de l'utilisateur (optionnel).
    """
    name: str
    email: EmailStr
    account_id: int
    age: Optional[int] = None

    @field_validator("account_id")
    def validate_account_id(cls, value):
        """Validation personnalisée : account_id doit être positif.
        
        Args:
            value: L'identifiant du compte à valider.
            
        Returns:
            int: La valeur validée de account_id.
            
        Raises:
            ValueError: Si account_id est inférieur ou égal à zéro.
        """
        # Vérifier que l'account_id est strictement positif
        if value <= 0:
            raise ValueError(f"account_id must be positive: {value}")
        return value

    @field_validator("age")
    def validate_age(cls, value):
        """Validation personnalisée : age doit être entre 0 et 150.
        
        Args:
            value: L'âge à valider.
            
        Returns:
            int or None: La valeur validée de age (ou None si non fourni).
            
        Raises:
            ValueError: Si age est négatif ou supérieur à 150.
        """
        if value is not None:
            # Vérifier que l'âge est dans la plage valide [0, 150]
            if value < 0 or value > 150:
                raise ValueError(f"age must be between 0 and 150: {value}")
        return value


class Product(BaseModel):
    """Modèle Product avec validation de prix et de quantité.
    
    Représente un produit avec ses informations commerciales.
    Valide que le prix et la quantité sont strictement positifs.
    
    Attributes:
        name: Nom du produit.
        price: Prix unitaire du produit.
        quantity: Quantité en stock (défaut: 1).
    """
    name: str
    price: float
    quantity: int = 1

    @field_validator("price")
    def validate_price(cls, value):
        """Le prix doit être positif.
        
        Args:
            value: Le prix unitaire à valider.
            
        Returns:
            float: La valeur validée du prix.
            
        Raises:
            ValueError: Si le prix est inférieur ou égal à zéro.
        """
        # Assurer que le prix est strictement positif
        if value <= 0:
            raise ValueError(f"price must be positive: {value}")
        return value

    @field_validator("quantity")
    def validate_quantity(cls, value):
        """La quantité doit être positive.
        
        Args:
            value: La quantité à valider.
            
        Returns:
            int: La valeur validée de quantity.
            
        Raises:
            ValueError: Si la quantité est inférieure ou égale à zéro.
        """
        # Vérifier que la quantité est strictement positive
        if value <= 0:
            raise ValueError(f"quantity must be positive: {value}")
        return value


class Order(BaseModel):
    """Modèle Order contenant les relations avec User et Product.
    
    Représente une commande composée de produits associés à un client.
    Inclut un identifiant unique et une date de création.
    
    Attributes:
        order_id: Identifiant numérique unique de la commande.
        customer: Instance User représentant le client qui passe la commande.
        products: Liste des produits inclus dans la commande.
        created_at: Date et heure de création de la commande.
    """
    order_id: int
    customer: User
    products: List[Product]
    created_at: datetime = datetime.now()

    def total_amount(self) -> float:
        """Calcule le montant total de la commande.
        
        Le total est calculé en multipliant le prix unitaire par la quantité
        pour chaque produit, puis en additionnant tous les sous-totaux.
        
        Returns:
            float: La somme des (prix * quantité) pour tous les produits.
        """
        # Itérer sur chaque produit et cumuler (prix × quantité)
        return sum(p.price * p.quantity for p in self.products)

    @field_validator("order_id")
    def validate_order_id(cls, value):
        """order_id doit être positif.
        
        Args:
            value: L'identifiant de la commande à valider.
            
        Returns:
            int: La valeur validée de order_id.
            
        Raises:
            ValueError: Si order_id est inférieur ou égal à zéro.
        """
        # Vérifier que l'identifiant de commande est strictement positif
        if value <= 0:
            raise ValueError(f"order_id must be positive: {value}")
        return value
