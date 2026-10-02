package com.examly.springapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Document upload request")
public class DocumentUploadRequest {
    
    @Schema(description = "Name of the file", example = "document.pdf", required = true)
    private String filename;
    
    @Schema(description = "Email address", example = "user@example.com", required = true)
    private String email;
    
    @Schema(description = "Base64 encoded file data", example = "JVBERi0xLjQKJcOkw7zDtsO...")
    private String fileData;
    
    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getFileData() { return fileData; }
    public void setFileData(String fileData) { this.fileData = fileData; }
}