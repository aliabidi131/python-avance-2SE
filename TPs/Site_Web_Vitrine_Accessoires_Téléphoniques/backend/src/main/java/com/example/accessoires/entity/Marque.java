package com.example.accessoires.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

// entite marque
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "accessoires"})
public class Marque {

    // id unique
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // nom marque
    private String nom;

    // description
    private String description;

    // url de l'image
    private String imageUrl;

    @OneToMany(mappedBy = "marque", cascade = CascadeType.ALL)
    @jakarta.annotation.Nullable
    private java.util.List<Accessoire> accessoires;
}