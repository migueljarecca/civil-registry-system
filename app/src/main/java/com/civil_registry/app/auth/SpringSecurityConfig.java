package com.civil_registry.app.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.civil_registry.app.auth.filters.JwtAuthenticationFilter;
import com.civil_registry.app.auth.filters.JwtAuthorizationFilter;
import com.civil_registry.app.auth.services.JwtService;


@Configuration
@EnableWebSecurity 
public class SpringSecurityConfig {

    private final JwtService jwtService;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final AuthenticationConfiguration authenticationConfiguration;

    public SpringSecurityConfig(JwtService jwtService,
                                JwtAuthorizationFilter jwtAuthorizationFilter,
                                AuthenticationConfiguration authenticationConfiguration) {
        this.jwtService = jwtService;
        this.jwtAuthorizationFilter = jwtAuthorizationFilter;
        this.authenticationConfiguration = authenticationConfiguration;
    }
    

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        JwtAuthenticationFilter jwtAuthenticationFilter = 
        new JwtAuthenticationFilter(authenticationManager(), jwtService);

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/users").permitAll()
                
                .anyRequest().authenticated()
            )
            
            .addFilter(jwtAuthenticationFilter)
            .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }    
}
