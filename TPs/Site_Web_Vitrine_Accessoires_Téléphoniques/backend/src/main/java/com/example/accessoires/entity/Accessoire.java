package com.example.accessoires.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

// entite accessoire representant un produit
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Accessoire {

    // id unique
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // nom du produit
    private String nom;

    // prix
    private double prix;

    // type du produit
    private String type;

    // quantite disponible
    private int stock;

    // description
    private String description;

    // url de l'image
    private String imageUrl;

    // relation avec categorie
    @ManyToOne
    private Categorie categorie;

    // relation avec marque
    @ManyToOne
    private Marque marque;
}