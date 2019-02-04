package com.trouvetonprof.service;

import com.trouvetonprof.domain.Annonce;
import com.trouvetonprof.repository.AnnonceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Annonce.
 */
@Service
@Transactional
public class AnnonceService {

    private final Logger log = LoggerFactory.getLogger(AnnonceService.class);

    private final AnnonceRepository annonceRepository;

    public AnnonceService(AnnonceRepository annonceRepository) {
        this.annonceRepository = annonceRepository;
    }

    /**
     * Save a annonce.
     *
     * @param annonce the entity to save
     * @return the persisted entity
     */
    public Annonce save(Annonce annonce) {
        log.debug("Request to save Annonce : {}", annonce);
        return annonceRepository.save(annonce);
    }

    /**
     * Get all the annonces.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Annonce> findAll() {
        log.debug("Request to get all Annonces");
        return annonceRepository.findAll();
    }


    /**
     * Get one annonce by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Annonce> findOne(Long id) {
        log.debug("Request to get Annonce : {}", id);
        return annonceRepository.findById(id);
    }

    /**
     * Delete the annonce by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Annonce : {}", id);
        annonceRepository.deleteById(id);
    }
}
