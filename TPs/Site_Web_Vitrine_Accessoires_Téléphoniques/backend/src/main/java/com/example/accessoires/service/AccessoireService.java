package com.example.accessoires.service;

import com.example.accessoires.entity.Accessoire;
import com.example.accessoires.entity.Categorie;
import com.example.accessoires.entity.Marque;
import com.example.accessoires.repository.AccessoireRepository;
import com.example.accessoires.repository.CategorieRepository;
import com.example.accessoires.repository.MarqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

// service metier pour accessoire
@Service
public class AccessoireService {

    @Autowired
    private AccessoireRepository repository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Autowired
    private MarqueRepository marqueRepository;

    public Accessoire getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new com.example.accessoires.exception.ResourceNotFoundException("Accessoire non trouvé avec l'id : " + id));
    }

    @org.springframework.cache.annotation.Cacheable("accessoires")
    public List<Accessoire> getAll() {
        return repository.findAll();
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public Accessoire save(Accessoire a) {
        attachRelations(a);
        return repository.save(a);
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public Accessoire update(Long id, Accessoire a) {
        a.setId(id);
        attachRelations(a);
        return repository.save(a);
    }

    private void attachRelations(Accessoire a) {
        if (a.getCategorie() != null && a.getCategorie().getId() != null) {
            Categorie categorie = categorieRepository.findById(a.getCategorie().getId())
                    .orElseThrow(() -> new com.example.accessoires.exception.ResourceNotFoundException("Catégorie non trouvée avec l'id : " + a.getCategorie().getId()));
            a.setCategorie(categorie);
        }
        if (a.getMarque() != null && a.getMarque().getId() != null) {
            Marque marque = marqueRepository.findById(a.getMarque().getId())
                    .orElseThrow(() -> new com.example.accessoires.exception.ResourceNotFoundException("Marque non trouvée avec l'id : " + a.getMarque().getId()));
            a.setMarque(marque);
        }
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public void delete(Long id) {
        repository.deleteById(id);
    }
}