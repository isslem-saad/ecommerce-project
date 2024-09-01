package com.example.ecommerce.dao;

import com.example.ecommerce.entities.Commande;
import com.example.ecommerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommandeRepository extends JpaRepository<Commande,Long> {
}
