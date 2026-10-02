package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class EncryptionService {
    
    private static final String ENCRYPTION_KEY = "NEXUS_VAULT_KEY";
    
    public byte[] decrypt(String encryptedData) {
        try {
            // Decode base64
            byte[] decodedData = Base64.getDecoder().decode(encryptedData);
            String encryptedString = new String(decodedData);
            
            // XOR decryption
            StringBuilder decrypted = new StringBuilder();
            for (int i = 0; i < encryptedString.length(); i++) {
                decrypted.append((char) (encryptedString.charAt(i) ^ ENCRYPTION_KEY.charAt(i % ENCRYPTION_KEY.length())));
            }
            
            // Decode the original base64 file data
            return Base64.getDecoder().decode(decrypted.toString());
        } catch (Exception e) {
            throw new RuntimeException("Decryption failed", e);
        }
    }
    
    public String encrypt(byte[] data) {
        try {
            // Encode to base64 first
            String base64Data = Base64.getEncoder().encodeToString(data);
            
            // XOR encryption
            StringBuilder encrypted = new StringBuilder();
            for (int i = 0; i < base64Data.length(); i++) {
                encrypted.append((char) (base64Data.charAt(i) ^ ENCRYPTION_KEY.charAt(i % ENCRYPTION_KEY.length())));
            }
            
            // Encode the encrypted string to base64
            return Base64.getEncoder().encodeToString(encrypted.toString().getBytes());
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed", e);
        }
    }
}