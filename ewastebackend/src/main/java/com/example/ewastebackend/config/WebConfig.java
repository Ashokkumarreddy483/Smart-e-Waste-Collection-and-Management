package com.example.ewastebackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // ✅ Serve static uploaded images
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Base directory where uploads are stored
        String uploadPath = System.getProperty("user.dir") + "/uploads/";

        // Map /uploads/** URLs to the physical folder
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadPath)
                .setCachePeriod(3600); // cache 1 hour for performance
    }

    // ✅ Allow frontend (React) to access backend APIs
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:3000",    // React local dev
                        "http://127.0.0.1:3000"     // fallback for some browsers
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
