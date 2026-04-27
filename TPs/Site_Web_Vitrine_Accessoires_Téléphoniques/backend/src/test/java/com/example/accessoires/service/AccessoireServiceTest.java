package com.example.accessoires.service;

import com.example.accessoires.entity.Accessoire;
import com.example.accessoires.exception.ResourceNotFoundException;
import com.example.accessoires.repository.AccessoireRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AccessoireServiceTest {

    @Mock
    private AccessoireRepository repository;

    @InjectMocks
    private AccessoireService service;

    @Test
    void shouldReturnAllAccessoires() {
        var expected = List.of(new Accessoire(1L, "Test produit", 29.9, "Coque", 10, "Test description", "https://example.com/image.png", null, null));
        when(repository.findAll()).thenReturn(expected);

        var result = service.getAll();

        assertSame(expected, result);
        verify(repository, times(1)).findAll();
    }

    @Test
    void shouldReturnAccessoireById() {
        var accessoire = new Accessoire(1L, "Test produit", 29.9, "Coque", 10, "Description", "https://example.com/image.png", null, null);
        when(repository.findById(1L)).thenReturn(Optional.of(accessoire));

        var result = service.getById(1L);

        assertEquals(accessoire, result);
        verify(repository, times(1)).findById(1L);
    }

    @Test
    void shouldThrowWhenAccessoireNotFound() {
        when(repository.findById(42L)).thenReturn(Optional.empty());

        var exception = assertThrows(ResourceNotFoundException.class, () -> service.getById(42L));

        assertTrue(exception.getMessage().contains("Accessoire non trouvé"));
        verify(repository, times(1)).findById(42L);
    }

    @Test
    void shouldSaveAccessoire() {
        var accessoire = new Accessoire(null, "Nouveau produit", 19.9, "Chargeur", 20, "Description", "", null, null);
        var saved = new Accessoire(2L, "Nouveau produit", 19.9, "Chargeur", 20, "Description", "", null, null);
        when(repository.save(accessoire)).thenReturn(saved);

        var result = service.save(accessoire);

        assertEquals(saved, result);
        verify(repository, times(1)).save(accessoire);
    }

    @Test
    void shouldUpdateAccessoire() {
        var accessoire = new Accessoire(null, "Produit modifié", 39.9, "Protection", 5, "Description", "", null, null);
        var updated = new Accessoire(3L, "Produit modifié", 39.9, "Protection", 5, "Description", "", null, null);
        when(repository.save(any(Accessoire.class))).thenReturn(updated);

        var result = service.update(3L, accessoire);

        assertEquals(3L, result.getId());
        assertEquals(updated, result);
        verify(repository, times(1)).save(accessoire);
        assertEquals(3L, accessoire.getId());
    }

    @Test
    void shouldDeleteAccessoire() {
        service.delete(4L);

        verify(repository, times(1)).deleteById(4L);
    }
}
