package com.example.ecommerce.entities;

import com.example.ecommerce.dao.CategoryRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor @AllArgsConstructor
public class Product implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false,updatable = false)
    private Long id;
    private String imageUrl;
    private String name;
    private String description;
    private Long price;
    private Long stock;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @JsonIgnore
    @ManyToOne
    private Commande order;

    public void setCategory(Category category) {
        this.category = category;
    }


    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setOrder(Commande order) {
        this.order = order;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Long getPrice() {
        return price;
    }

    public Long getStock() {
        return stock;
    }

    public Category getCategory() {
        return category;
    }

    public Commande getOrder() {
        return order;
    }
}
