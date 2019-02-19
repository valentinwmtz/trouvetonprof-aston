package com.trouvetonprof.repository;

import com.trouvetonprof.domain.Annonce;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Annonce entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
	List<Annonce> findAllByProfilUserLogin(String login);
	List<Annonce> findByDomaineAnnonceId(Long id);
}
