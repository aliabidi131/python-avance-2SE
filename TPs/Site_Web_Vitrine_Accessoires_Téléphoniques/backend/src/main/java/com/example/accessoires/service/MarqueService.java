package com.example.accessoires.service;

import com.example.accessoires.entity.Marque;
import com.example.accessoires.repository.MarqueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarqueService {

    @Autowired
    private MarqueRepository repository;

    public Marque getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new com.example.accessoires.exception.ResourceNotFoundException("Marque non trouvée avec l'id : " + id));
    }

    @org.springframework.cache.annotation.Cacheable("marques")
    public List<Marque> getAll() {
        return repository.findAll();
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public Marque save(Marque m) {
        return repository.save(m);
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @org.springframework.cache.annotation.CacheEvict(value = {"accessoires", "categories", "marques"}, allEntries = true)
    public Marque update(Long id, Marque m) {
        m.setId(id);
        return repository.save(m);
    }
}