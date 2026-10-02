package com.examly.springapp.model;

import javax.persistence.*;

@Entity
@Table(name = "documents")
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String filename;
    
    @Column(nullable = false)
    private String email;
    
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileData;
    
    public Document() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public byte[] getFileData() { return fileData; }
    public void setFileData(byte[] fileData) { this.fileData = fileData; }
}