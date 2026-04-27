package com.example.accessoires.controller;

import com.example.accessoires.entity.Accessoire;
import com.example.accessoires.service.AccessoireService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AccessoireController.class)
class AccessoireControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AccessoireService service;

    @Test
    void shouldReturnAllAccessoires() throws Exception {
        var item = new Accessoire(1L, "Produit A", 19.9, "Coque", 5, "Desc", "https://example.com/image.png", null, null);
        when(service.getAll()).thenReturn(List.of(item));

        mockMvc.perform(get("/api/accessoires"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].nom").value("Produit A"));
    }

    @Test
    void shouldReturnAccessoireById() throws Exception {
        var item = new Accessoire(2L, "Produit B", 29.9, "Chargeur", 12, "Desc", "", null, null);
        when(service.getById(2L)).thenReturn(item);

        mockMvc.perform(get("/api/accessoires/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.nom").value("Produit B"));
    }

    @Test
    void shouldCreateAccessoire() throws Exception {
        var payload = new Accessoire(null, "Produit C", 49.9, "Chargeur", 7, "Desc", "", null, null);
        var saved = new Accessoire(3L, "Produit C", 49.9, "Chargeur", 7, "Desc", "", null, null);
        when(service.save(any(Accessoire.class))).thenReturn(saved);

        mockMvc.perform(post("/api/accessoires")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.nom").value("Produit C"));
    }

    @Test
    void shouldDeleteAccessoire() throws Exception {
        doNothing().when(service).delete(4L);

        mockMvc.perform(delete("/api/accessoires/4"))
                .andExpect(status().isNoContent());
    }
}
