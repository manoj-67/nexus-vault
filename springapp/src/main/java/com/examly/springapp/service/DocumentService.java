package com.examly.springapp.service;

import com.examly.springapp.model.Document;
import com.examly.springapp.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documentRepository;
    
    public Document saveDocument(String filename, String email, byte[] fileData) {
        Document document = new Document();
        document.setFilename(filename);
        document.setEmail(email);
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
}