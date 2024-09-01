package com.example.ecommerce.entities;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public enum Role{
USER,
ADMIN;
    public List<SimpleGrantedAuthority> getAuthorities() {
        if (this == ADMIN) {
            return Arrays.asList(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER")
            );
        }
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }
}