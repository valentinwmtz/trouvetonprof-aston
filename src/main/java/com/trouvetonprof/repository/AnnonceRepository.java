package com.trouvetonprof.repository;

import com.trouvetonprof.domain.Annonce;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Annonce entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {

	List<Annonce> findByDomaineAnnonceId(Long id);



}
