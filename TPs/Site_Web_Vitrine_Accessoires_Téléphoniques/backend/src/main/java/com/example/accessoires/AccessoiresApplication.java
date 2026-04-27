package com.example.accessoires;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@org.springframework.cache.annotation.EnableCaching
@SpringBootApplication
public class AccessoiresApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccessoiresApplication.class, args);
    }
}