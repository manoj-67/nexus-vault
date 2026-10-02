package com.examly.springapp.controller;

import com.examly.springapp.dto.DocumentUploadRequest;
import com.examly.springapp.model.Document;
import com.examly.springapp.service.DocumentService;
import com.examly.springapp.service.EncryptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Documents", description = "Document management endpoints")
public class DocumentController {
    
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(".pdf", ".doc", ".docx", ".txt", ".jpg", ".png");
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    
    @Autowired
    private DocumentService documentService;
    
    @Autowired
    private EncryptionService encryptionService;
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Controller is working");
    }
    
    @PostMapping("/upload")
    @Operation(summary = "Upload document (Multipart)", description = "Upload a document with associated email")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (file.isEmpty()) {
                response.put("error", "File is empty");
                return ResponseEntity.badRequest().body(response);
            }
            
            if (file.getSize() > MAX_FILE_SIZE) {
                response.put("error", "File size exceeds 10MB limit");
                return ResponseEntity.badRequest().body(response);
            }
            
            String filename = file.getOriginalFilename();
            if (filename == null || !isValidFileType(filename)) {
                response.put("error", "Invalid file type. Allowed: " + ALLOWED_EXTENSIONS);
                return ResponseEntity.badRequest().body(response);
            }
            
            if (email == null || email.trim().isEmpty() || !isValidEmail(email)) {
                response.put("error", "Valid email is required");
                return ResponseEntity.badRequest().body(response);
            }
            
            Document document = documentService.saveDocument(filename, email.trim(), file.getBytes());
            response.put("message", "File uploaded successfully");
            response.put("document", document);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/upload-json")
    @Operation(summary = "Upload document (JSON)", description = "Upload a document with associated email and base64 file data (no multipart)")
    public ResponseEntity<?> uploadDocumentJson(@RequestBody DocumentUploadRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (request == null) {
                response.put("error", "Request body is required");
                return ResponseEntity.badRequest().body(response);
            }
            String filename = request.getFilename();
            String email = request.getEmail();
            String fileDataBase64 = request.getFileData();
            if (filename == null || filename.trim().isEmpty()) {
                response.put("error", "Filename is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (!isValidFileType(filename)) {
                response.put("error", "Invalid file type. Allowed: " + ALLOWED_EXTENSIONS);
                return ResponseEntity.badRequest().body(response);
            }
            if (email == null || email.trim().isEmpty()) {
                response.put("error", "Email is required");
                return ResponseEntity.badRequest().body(response);
            }
            if (!isValidEmail(email)) {
                response.put("error", "Valid email format is required");
                return ResponseEntity.badRequest().body(response);
            }
            byte[] fileData = null;
            if (fileDataBase64 != null && !fileDataBase64.isEmpty()) {
                try {
                    // Decode base64 data directly
                    fileData = Base64.getDecoder().decode(fileDataBase64);
                    if (fileData.length > MAX_FILE_SIZE) {
                        response.put("error", "File size exceeds 10MB limit");
                        return ResponseEntity.badRequest().body(response);
                    }
                } catch (IllegalArgumentException e) {
                    response.put("error", "Invalid base64 file data: " + e.getMessage());
                    return ResponseEntity.badRequest().body(response);
                }
            } else {
                response.put("error", "File data is required");
                return ResponseEntity.badRequest().body(response);
            }
            Document document = documentService.saveDocument(filename, email.trim(), fileData);
            response.put("message", "File uploaded successfully");
            response.put("document", document);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/documents")
    @Operation(summary = "Get all documents", description = "Retrieve metadata for all documents")
    public ResponseEntity<List<Map<String, Object>>> getAllDocuments() {
        try {
            List<Map<String, Object>> metadata = documentService.getAllMetadata();
            return ResponseEntity.ok(metadata);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/documents/search")
    @Operation(summary = "Get documents with pagination and email filter", description = "Retrieve documents with pagination and optional email filter")
    public ResponseEntity<Map<String, Object>> getDocumentsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String email) {
        try {
            Map<String, Object> result = documentService.getDocumentsByEmail(email, page, size);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/documents/{id}")
    @Operation(summary = "Get document by ID", description = "Retrieve a specific document by its ID")
    public ResponseEntity<Document> getDocument(@Parameter(description = "Document ID") @PathVariable Long id) {
        try {
            Optional<Document> document = documentService.getDocument(id);
            return document.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/documents/{id}/download")
    @Operation(summary = "Download document", description = "Download a document by its ID")
    public ResponseEntity<byte[]> downloadDocument(@Parameter(description = "Document ID") @PathVariable Long id) {
        try {
            Optional<Document> documentOpt = documentService.getDocument(id);
            if (documentOpt.isPresent()) {
                Document document = documentOpt.get();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDispositionFormData("attachment", document.getFilename());
                // Decrypt file data before sending
                byte[] decryptedData = document.getFileData();
                return ResponseEntity.ok().headers(headers).body(decryptedData);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/documents/{id}")
    @Operation(summary = "Delete document", description = "Delete a document by its ID")
    public ResponseEntity<?> deleteDocument(@Parameter(description = "Document ID") @PathVariable Long id) {
        try {
            boolean deleted = documentService.deleteDocument(id);
            Map<String, Object> response = new HashMap<>();
            if (deleted) {
                response.put("message", "Document deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Document not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", "Failed to delete document: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    private boolean isValidFileType(String filename) {
        if (filename == null || !filename.contains(".")) {
            return false;
        }
        String extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
        return ALLOWED_EXTENSIONS.contains(extension);
    }
    
    private boolean isValidEmail(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,}$");
    }
}