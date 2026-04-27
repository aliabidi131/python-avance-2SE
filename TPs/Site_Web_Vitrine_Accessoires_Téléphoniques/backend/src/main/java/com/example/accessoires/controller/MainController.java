package com.example.accessoires.controller;

import com.example.accessoires.service.AccessoireService;
import com.example.accessoires.service.CategorieService;
import com.example.accessoires.service.MarqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @Autowired
    private AccessoireService accessoireService;

    @Autowired
    private CategorieService categorieService;

    @Autowired
    private MarqueService marqueService;

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("recentProducts", accessoireService.getAll());
        return "index";
    }

    @GetMapping("/produits")
    public String produits(Model model) {
        model.addAttribute("produits", accessoireService.getAll());
        return "produits";
    }

    @GetMapping("/categories")
    public String categories(Model model) {
        model.addAttribute("categories", categorieService.getAll());
        return "categories";
    }

    @GetMapping("/marques")
    public String marques(Model model) {
        model.addAttribute("marques", marqueService.getAll());
        return "marques";
    }
}
