package com.examly.springapp.controller;

import com.examly.springapp.model.Document;
import com.examly.springapp.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DocumentController {
    
    @Autowired
    private DocumentService documentService;
    
    @PostMapping("/upload")
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email) {
        try {
            Document document = documentService.saveDocument(
                file.getOriginalFilename(), 
                email, 
                file.getBytes()
            );
            return ResponseEntity.ok(document);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/documents")
    public ResponseEntity<List<Map<String, Object>>> getAllDocuments() {
        List<Map<String, Object>> metadata = documentService.getAllMetadata();
        return ResponseEntity.ok(metadata);
    }
    
    @GetMapping("/documents/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable Long id) {
        Optional<Document> document = documentService.getDocument(id);
        return document.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
}