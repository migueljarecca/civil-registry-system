package com.civil_registry.app.auth.userdetails;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.civil_registry.app.models.entities.User;

public class CustomUserDetails implements UserDetails{

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRolName()))
                .toList();        
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isEnabled() {
        return user.isEnabled();
    }    


    /**
     * Returns the wrapped {@link User} entity.
     * Useful to access user-specific fields (id, name, dni) from controllers or services.
     */
    public User getUser() {
        return user;
    }
}
