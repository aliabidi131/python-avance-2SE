# READMEALI

## Objectif
Ce projet contient désormais :
- 5 catégories pré-remplies
- 2 marques pré-remplies
- 5 accessoires pré-remplis

Ces données sont automatiquement ajoutées à la base de données au démarrage du backend si la base est vide.

---

## Comment ajouter un accessoire pas à pas

### 1. Démarrer le backend
1. Ouvrez un terminal dans `backend/`.
2. Lancez la commande :
   ```bash
   ./mvnw spring-boot:run
   ```
   ou sous Windows :
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
3. Le backend tourne sur `http://localhost:8082`.

### 2. Démarrer le frontend
1. Ouvrez un terminal dans `frontend/`.
2. Installez les dépendances si nécessaire :
   ```bash
   npm install
   ```
3. Lancez l'application Next.js :
   ```bash
   npm run dev
   ```
4. Le frontend tourne sur `http://localhost:3000`.

### 3. Vérifier les catégories et marques déjà disponibles
1. Ouvrez le navigateur sur `http://localhost:3000`.
2. Allez dans les pages `Catégories` et `Marques` du menu.
3. Vous devez voir les catégories et les marques créées automatiquement.

### 4. Ajouter un accessoire depuis l'interface
1. Dans le menu, choisissez `Accessoires` puis `Ajouter`.
2. Remplissez :
   - `Nom de l'article`
   - `Prix (€)`
   - `Stock initial`
   - `Catégorie` (choisissez l'une des 5 catégories existantes)
   - `Marque` (choisissez l'une des 2 marques existantes)
   - `Type`
   - `URL de l'image`
   - `Description`
3. Cliquez sur `Ajouter l'accessoire`.
4. Après validation, vous serez redirigé vers la liste des accessoires.

### 5. Si vous préférez utiliser l'API
Vous pouvez aussi créer un accessoire avec un POST JSON vers :
- `http://localhost:8082/api/accessoires`

Exemple de payload :
```json
{
  "nom": "Coque matelassée",
  "prix": 29.90,
  "description": "Coque confortable et antidérapante pour smartphone.",
  "type": "Coque",
  "stock": 45,
  "imageUrl": "https://example.com/coque.jpg",
  "categorie": { "id": 1 },
  "marque": { "id": 1 }
}
```

### 6. Bonnes pratiques
- Assurez-vous que la `categorie.id` et la `marque.id` existent dans la base.
- Choisissez un `imageUrl` valide pour que l'image puisse s'afficher correctement.
- Si vous ajoutez plusieurs accessoires, vérifiez le stock et le prix pour chaque produit.

---

## Données préremplies
### Catégories
- Coques
- Batteries
- Écouteurs
- Supports
- Chargeurs

### Marques
- Pixelux
- PowerPro

### Accessoires ajoutés
- Coque anti-choc Titan
- Batterie externe 10000 mAh
- Écouteurs sans fil Nova
- Support voiture magnétique
- Chargeur rapide 30W
