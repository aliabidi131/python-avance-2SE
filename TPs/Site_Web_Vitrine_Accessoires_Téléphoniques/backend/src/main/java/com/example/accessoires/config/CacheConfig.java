package com.example.accessoires.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;

import java.time.Duration;

@Configuration
public class CacheConfig {

    @Bean
    @Primary
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        try {
            // Tentative de connexion au serveur Redis
            connectionFactory.getConnection().close();
            
            return RedisCacheManager.builder(connectionFactory)
                    .cacheDefaults(RedisCacheConfiguration.defaultCacheConfig()
                            .entryTtl(Duration.ofMinutes(60)))
                    .build();
        } catch (Exception e) {
            // Fallback sur un cache en mémoire si Redis est indisponible
            System.err.println("REDIS INDISPONIBLE : Fallback sur ConcurrentMapCacheManager");
            return new ConcurrentMapCacheManager("accessoires", "categories", "marques");
        }
    }
}
