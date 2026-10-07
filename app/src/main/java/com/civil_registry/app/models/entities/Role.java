package com.civil_registry.app.models.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "roles") 
public class Role {

    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY) 
    private Long id;

    @Column (nullable = false, unique = true)
    private String rolName;

    public Role() {
    }

    public Role(Long id, String rolName) {
        this.id = id;
        this.rolName = rolName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRolName() {
        return rolName;
    }

    public void setRolName(String rolName) {
        this.rolName = rolName;
    }

    @Override
    public String toString() {
        return "Role [id=" + id + ", rolName=" + rolName + "]";
    }
    
}
