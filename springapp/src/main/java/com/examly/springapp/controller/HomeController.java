package com.examly.springapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Home", description = "Backend status endpoints")
public class HomeController {
    
    @GetMapping("/")
    @Operation(summary = "Backend status", description = "Returns backend running status")
    public String home() {
        return "Backend is running successfully!";
    }
    
    @GetMapping("/status")
    @Operation(summary = "Health check", description = "Returns application health status")
    public String status() {
        return "Application is healthy and running on port 8080";
    }
}