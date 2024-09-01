package com.example.ecommerce.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
@Data @NoArgsConstructor @AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CategoryName name;  // Enum avec les valeurs SKINCARE et MAKEUP
    @Enumerated(EnumType.STRING)
    private TypeMakeup typeMakeup;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> product;

    //@JsonIgnore
    //@OneToMany(mappedBy = "category")
   // private List<Type> type;  // Cette liste sera remplie seulement si le nom est "MAKEUP"


    public CategoryName getName() {
        return name;
    }

    public void setName(CategoryName name) {
        this.name = name;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public TypeMakeup getTypeMakeup() {
        return typeMakeup;
    }

    public void setTypeMakeup(TypeMakeup typeMakeup) {
        this.typeMakeup = typeMakeup;
    }
}

