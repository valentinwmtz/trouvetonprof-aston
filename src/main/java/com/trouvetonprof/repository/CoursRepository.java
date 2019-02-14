package com.trouvetonprof.repository;

import com.trouvetonprof.domain.Cours;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Cours entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoursRepository extends JpaRepository<Cours, Long> {
    List<Cours> findByAnnonceId(long id);
    
    List<Cours> findCommentaireByAnnonceId(Long id);
}
