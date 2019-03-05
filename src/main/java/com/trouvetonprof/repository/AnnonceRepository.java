package com.trouvetonprof.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import com.trouvetonprof.domain.Annonce;


/**
 * Spring Data  repository for the Annonce entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {


    List<Annonce> findAllByDomaineId(Long id);

    List<Annonce> findAllByProfilUserLogin(String login);

}
