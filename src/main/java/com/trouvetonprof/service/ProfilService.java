package com.trouvetonprof.service;

import com.trouvetonprof.domain.Profil;
import com.trouvetonprof.repository.ProfilRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Profil.
 */
@Service
@Transactional
public class ProfilService {

    private final Logger log = LoggerFactory.getLogger(ProfilService.class);

    private final ProfilRepository profilRepository;

    public ProfilService(ProfilRepository profilRepository) {
        this.profilRepository = profilRepository;
    }

    /**
     * Save a profil.
     *
     * @param profil the entity to save
     * @return the persisted entity
     */
    public Profil save(Profil profil) {
        log.debug("Request to save Profil : {}", profil);
        return profilRepository.save(profil);
    }

    /**
     * Get all the profils.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Profil> findAll() {
        log.debug("Request to get all Profils");
        return profilRepository.findAll();
    }


    /**
     * Get one profil by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Profil> findOne(Long id) {
        log.debug("Request to get Profil : {}", id);
        return profilRepository.findById(id);
    }

    /**
     * Delete the profil by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Profil : {}", id);
        profilRepository.deleteById(id);
    }
}
