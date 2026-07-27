package com.civil_registry.app.constants;

public class DocumentConstants {
    
    private DocumentConstants() {
        // Private constructor to prevent instantiation
    }

    public static final String STATUS_201 = "201";
    public static final String MESSAGE_201 = "Document created successfully";

    public static final String STATUS_200 = "200";
    public static final String MESSAGE_200 = "Request processed successfully";

    public static final String STATUS_417 = "417";
    public static final String MESSAGE_417_UPDATE = "Update operation failed. Please try again or contact support";
    public static final String MESSAGE_417_DELETE = "Delete operation failed. Please try again or contact support";

    public static final String MESSAGE_DOCUMENT_NOT_FOUND = "Document not found";
}
