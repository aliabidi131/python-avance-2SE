package com.example.accessoires.repository;

import com.example.accessoires.entity.Marque;
import org.springframework.data.jpa.repository.JpaRepository;

// repository marque
public interface MarqueRepository extends JpaRepository<Marque, Long> {
}