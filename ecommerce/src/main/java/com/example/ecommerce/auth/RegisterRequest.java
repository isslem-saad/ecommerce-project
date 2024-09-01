package com.example.ecommerce.auth;

//import com.example.ecommerce.entities.ERole;
import com.example.ecommerce.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Role role;

    public void setRole(String role) {
        this.role = Role.valueOf(role.toUpperCase());
    }
}