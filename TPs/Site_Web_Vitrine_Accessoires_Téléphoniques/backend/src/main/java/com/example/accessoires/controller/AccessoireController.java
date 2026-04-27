package com.example.accessoires.controller;

import com.example.accessoires.entity.Accessoire;
import com.example.accessoires.service.AccessoireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accessoires")
public class AccessoireController {

    @Autowired
    private AccessoireService service;

    @GetMapping
    public ResponseEntity<List<Accessoire>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accessoire> getById(@PathVariable Long id) {
        return new ResponseEntity<>(service.getById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Accessoire> create(@RequestBody Accessoire a) {
        return new ResponseEntity<>(service.save(a), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Accessoire> update(@PathVariable Long id, @RequestBody Accessoire a) {
        return new ResponseEntity<>(service.update(id, a), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}