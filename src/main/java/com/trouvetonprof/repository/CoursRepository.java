package com.trouvetonprof.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.trouvetonprof.domain.Cours;


/**
 * Spring Data  repository for the Cours entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {
	List<Cours> findByAnnonceId(long id);

	List<Cours> findCommentaireByAnnonceId(Long id);

	List<Cours> findAllByAnnonceProfilUserLogin(String login);

	List<Cours> findAllByCoursId(Long id);
}
