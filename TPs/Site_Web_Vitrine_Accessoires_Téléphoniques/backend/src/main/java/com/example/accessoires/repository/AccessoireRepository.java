package com.example.accessoires.repository;

import com.example.accessoires.entity.Accessoire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessoireRepository extends JpaRepository<Accessoire, Long> { }