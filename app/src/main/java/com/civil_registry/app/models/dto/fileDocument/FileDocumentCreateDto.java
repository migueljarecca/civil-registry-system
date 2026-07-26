package com.civil_registry.app.models.dto.fileDocument;

public class FileDocumentCreateDto {
    private String fileName;
    private String fileUrl;
    private Long fileSize;
    private String contentType;

    public FileDocumentCreateDto() {
    }

    public FileDocumentCreateDto(String fileName, String fileUrl, Long fileSize, String contentType) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.fileSize = fileSize;
        this.contentType = contentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    @Override
    public String toString() {
        return "FileDocumentCreateDto [fileName=" + fileName + ", fileUrl=" + fileUrl + ", fileSize=" + fileSize
                + ", contentType=" + contentType + "]";
    }

    
}
