package com.example.accessoires;

import com.example.accessoires.entity.Accessoire;
import com.example.accessoires.entity.Categorie;
import com.example.accessoires.entity.Marque;
import com.example.accessoires.repository.AccessoireRepository;
import com.example.accessoires.repository.CategorieRepository;
import com.example.accessoires.repository.MarqueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CategorieRepository categorieRepository;
    private final MarqueRepository marqueRepository;
    private final AccessoireRepository accessoireRepository;

    public DataInitializer(CategorieRepository categorieRepository,
                           MarqueRepository marqueRepository,
                           AccessoireRepository accessoireRepository) {
        this.categorieRepository = categorieRepository;
        this.marqueRepository = marqueRepository;
        this.accessoireRepository = accessoireRepository;
    }

    @Override
    public void run(String... args) {
        if (!categorieRepository.findAll().isEmpty() || !marqueRepository.findAll().isEmpty() || !accessoireRepository.findAll().isEmpty()) {
            return;
        }

        Categorie coques = new Categorie(null, "Coques", "Coques et protections pour smartphones", "https://images.unsplash.com/photo-1512499617640-c2f999018b72", null);
        Categorie batteries = new Categorie(null, "Batteries", "Batteries et chargeurs externes haute capacité", "https://images.unsplash.com/photo-1510552776732-03e61cf4b144", null);
        Categorie ecouteurs = new Categorie(null, "Écouteurs", "Écouteurs Bluetooth et filaires pour tous les budgets", "https://images.unsplash.com/photo-1511715285373-3eb42a6e3a38", null);
        Categorie supports = new Categorie(null, "Supports", "Supports de voiture et supports de bureau pour téléphone", "https://images.unsplash.com/photo-1527430253228-e93688616381", null);
        Categorie chargeurs = new Categorie(null, "Chargeurs", "Chargeurs muraux et câbles de charge rapides", "https://images.unsplash.com/photo-1518770660439-4636190af475", null);

        List<Categorie> categories = categorieRepository.saveAll(List.of(coques, batteries, ecouteurs, supports, chargeurs));

        Marque pixelux = new Marque(null, "Pixelux", "Marque premium d'accessoires élégants", "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", null);
        Marque powerpro = new Marque(null, "PowerPro", "Solutions de charge et audio robustes", "https://images.unsplash.com/photo-1491933388443-288f3adf6ead", null);

        List<Marque> marques = marqueRepository.saveAll(List.of(pixelux, powerpro));

        Accessoire a1 = new Accessoire(null, "Coque anti-choc Titan", 24.99, "Coque", 150, "Coque robuste avec protection complète et grip renforcé", "https://images.unsplash.com/photo-1512499617640-c2f999018b72", categories.get(0), marques.get(0));
        Accessoire a2 = new Accessoire(null, "Batterie externe 10000 mAh", 29.90, "Batterie", 90, "Batterie compacte avec charge rapide USB-C et deux ports de sortie", "https://images.unsplash.com/photo-1510552776732-03e61cf4b144", categories.get(1), marques.get(1));
        Accessoire a3 = new Accessoire(null, "Écouteurs sans fil Nova", 49.50, "Écouteurs", 120, "Écouteurs Bluetooth avec réduction de bruit et autonomie 30h", "https://images.unsplash.com/photo-1511715285373-3eb42a6e3a38", categories.get(2), marques.get(1));
        Accessoire a4 = new Accessoire(null, "Support voiture magnétique", 19.75, "Support", 70, "Support magnétique pour tableau de bord compatible tous smartphones", "https://images.unsplash.com/photo-1527430253228-e93688616381", categories.get(3), marques.get(0));
        Accessoire a5 = new Accessoire(null, "Chargeur rapide 30W", 22.40, "Chargeur", 110, "Chargeur USB-C rapide avec protocole PD et câble tressé inclus", "https://images.unsplash.com/photo-1518770660439-4636190af475", categories.get(4), marques.get(1));

        accessoireRepository.saveAll(List.of(a1, a2, a3, a4, a5));
    }
}
