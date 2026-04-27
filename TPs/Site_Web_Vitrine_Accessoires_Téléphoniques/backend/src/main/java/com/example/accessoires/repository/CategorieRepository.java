package com.example.accessoires.repository;



import com.example.accessoires.entity.Categorie;
import org.springframework.data.jpa.repository.JpaRepository;

// repository categorie
public interface CategorieRepository extends JpaRepository<Categorie, Long> {
}