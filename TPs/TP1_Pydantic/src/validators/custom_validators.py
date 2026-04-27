"""
Validateurs personnalisés pour Pydantic.

Ce module contient des fonctions de validation réutilisables
qui peuvent être appliquées aux champs des modèles Pydantic.
"""
from pydantic import field_validator


def validate_positive_number(field_name: str):
    """Décorateur de validateur générique pour les nombres positifs.
    
    Crée une fonction de validateur qui vérifie qu'une valeur
    est strictement positive (> 0).
    
    Args:
        field_name: Nom du champ à afficher dans les messages d'erreur.
        
    Returns:
        function: Fonction de validateur conforme à Pydantic.
        
    Raises:
        ValueError: Si la valeur est inférieure ou égale à zéro.
    """
    def validator(cls, value):
        # Vérifier que la valeur est strictement positive
        if value <= 0:
            raise ValueError(f"{field_name} must be positive: {value}")
        return value
    return validator


def validate_age(cls, value):
    """Validation de l'âge : doit être entre 0 et 150.
    
    Vérifie que l'âge est dans une plage réaliste.
    Accepte None pour les champs optionnels.
    
    Args:
        cls: Classe du modèle (fournie automatiquement par le décorateur).
        value: La valeur d'âge à valider.
        
    Returns:
        int or None: La valeur validée (ou None si non fourni).
        
    Raises:
        ValueError: Si l'âge est hors de la plage [0, 150].
    """
    # Accepter None pour les champs optionnels
    if value is not None:
        # Vérifier que l'âge est dans la plage valide
        if value < 0 or value > 150:
            raise ValueError(f"age must be between 0 and 150: {value}")
    return value
