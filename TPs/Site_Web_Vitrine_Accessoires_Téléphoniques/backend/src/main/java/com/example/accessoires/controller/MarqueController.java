package com.example.accessoires.controller;

import com.example.accessoires.entity.Marque;
import com.example.accessoires.service.MarqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marques")
public class MarqueController {

    @Autowired
    private MarqueService service;

    @GetMapping
    public ResponseEntity<List<Marque>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Marque> getById(@PathVariable Long id) {
        return new ResponseEntity<>(service.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Marque> create(@RequestBody Marque m) {
        return new ResponseEntity<>(service.save(m), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marque> update(@PathVariable Long id, @RequestBody Marque m) {
        return new ResponseEntity<>(service.update(id, m), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}