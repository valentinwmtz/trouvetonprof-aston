package com.trouvetonprof.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trouvetonprof.domain.Disponibilite;


/**
 * Spring Data  repository for the Disponibilite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisponibiliteRepository extends JpaRepository<Disponibilite, Long> {
	List<Disponibilite> findByAnnonceId(long id);
	List<Disponibilite> findAllByAnnonceProfilUserLogin(String login);
}
