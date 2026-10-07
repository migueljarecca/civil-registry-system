package com.civil_registry.app.models.dto.user;

public class UserCreateDto {
    
    private String name;
    private String lastname;
    private String dni;
    private String email;
    private String password;
    
    public UserCreateDto() {
    }

    public UserCreateDto(String name, String lastname, String dni, String email, String password) {
        this.name = name;
        this.lastname = lastname;
        this.dni = dni;
        this.email = email;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "UserCreateDto [name=" + name + ", lastname=" + lastname + ", dni=" + dni + ", email=" + email
                + ", password=" + password + "]";
    }

}
