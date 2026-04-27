package com.example.accessoires.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        try {
            // Attempt PostgreSQL
            DataSource ds = DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5432/accessoiresdb")
                .username("postgres")
                .password("26818018")
                .driverClassName("org.postgresql.Driver")
                .build();
            
            // Just a quick check to see if it works
            ds.getConnection().close();
            System.out.println("POSTGRES CONNECTE : Utilisation de la base PostgreSQL");
            return ds;
        } catch (Exception e) {
            // Fallback to H2
            System.err.println("POSTGRES INDISPONIBLE : Fallback sur H2 en mémoire");
            return DataSourceBuilder.create()
                .url("jdbc:h2:mem:accessoiresdb;DB_CLOSE_DELAY=-1")
                .username("sa")
                .password("")
                .driverClassName("org.h2.Driver")
                .build();
        }
    }
}
