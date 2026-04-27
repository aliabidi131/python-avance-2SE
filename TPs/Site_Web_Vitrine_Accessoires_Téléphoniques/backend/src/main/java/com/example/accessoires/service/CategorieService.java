package com.example.accessoires.service;

import com.example.accessoires.entity.Categorie;
import com.example.accessoires.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {

    @Autowired
    private CategorieRepository repository;

    public Categorie getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new com.example.accessoires.exception.ResourceNotFoundException("Catégorie non trouvée avec l'id : " + id));
    }

    @org.springframework.cache.annotation.Cacheable("categories")
    public List<Categorie> getAll() {
        return repository.findAll();
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public Categorie save(Categorie c) {
        return repository.save(c);
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public Categorie update(Long id, Categorie c) {
        c.setId(id);
        return repository.save(c);
    }
}