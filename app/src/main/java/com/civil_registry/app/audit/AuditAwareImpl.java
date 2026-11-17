package com.civil_registry.app.audit;
import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.civil_registry.app.auth.userdetails.CustomUserDetails;

@Component("auditAwareImpl")
public class AuditAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {

        // 1. Obtain authentication
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 2. If there is no authentication (e.g., public login, or background tasks)
        if (authentication == null || !authentication.isAuthenticated() || 
            authentication.getPrincipal().equals("anonymousUser")) {
            return Optional.of("System");
        }

        // 3. Obtain the principal (CustomUserDetails)
        Object principal = authentication.getPrincipal();

        if (principal instanceof CustomUserDetails) {
            CustomUserDetails userDetails = (CustomUserDetails) principal;
            // Return the user's email
            return Optional.of(userDetails.getUsername());
        }

        // 4. Fallback
        return Optional.of(authentication.getName());
    }
    
}
