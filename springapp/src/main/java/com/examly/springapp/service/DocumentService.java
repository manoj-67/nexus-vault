package com.examly.springapp.service;

import com.examly.springapp.model.Document;
import com.examly.springapp.repository.DocumentRepository;
import com.examly.springapp.service.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documentRepository;
    
    @Autowired
    private EncryptionService encryptionService;
    
    public Document saveDocument(String filename, String email, byte[] fileData) {
        Document document = new Document();
        document.setFilename(filename);
        document.setEmail(email);
        // Store encrypted file data
        document.setFileData(fileData);
        return documentRepository.save(document);
    }
    
    public Optional<Document> getDocument(Long id) {
        return documentRepository.findById(id);
    }
    
    public List<Map<String, Object>> getAllMetadata() {
        List<Document> documents = documentRepository.findAll();
        List<Map<String, Object>> metadata = new ArrayList<>();
        
        for (Document doc : documents) {
            Map<String, Object> meta = new HashMap<>();
            meta.put("id", doc.getId());
            meta.put("filename", doc.getFilename());
            meta.put("email", doc.getEmail());
            metadata.add(meta);
        }
        
        return metadata;
    }
    
    public Map<String, Object> getDocumentsByEmail(String email, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Document> documentPage;
        
        if (email == null || email.trim().isEmpty()) {
            documentPage = documentRepository.findAll(pageable);
        } else {
            documentPage = documentRepository.findByEmailContainingIgnoreCase(email.trim(), pageable);
        }
        
        List<Map<String, Object>> metadata = new ArrayList<>();
        for (Document doc : documentPage.getContent()) {
            Map<String, Object> meta = new HashMap<>();
            meta.put("id", doc.getId());
            meta.put("filename", doc.getFilename());
            meta.put("email", doc.getEmail());
            metadata.add(meta);
        }
        
        Map<String, Object> result = new HashMap<>();
        result.put("documents", metadata);
        result.put("totalElements", documentPage.getTotalElements());
        result.put("totalPages", documentPage.getTotalPages());
        result.put("currentPage", page);
        result.put("size", size);
        
        return result;
    }
    
    public boolean deleteDocument(Long id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}