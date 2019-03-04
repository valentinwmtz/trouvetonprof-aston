package com.trouvetonprof.repository;

import com.trouvetonprof.domain.Profil;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Profil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilRepository extends JpaRepository<Profil, Long> {
    List<Profil> findAllByUserLogin(String login);
    Profil findFirstByUserLogin(String login);
}
