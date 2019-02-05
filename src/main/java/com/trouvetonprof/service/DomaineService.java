package com.trouvetonprof.service;

import com.trouvetonprof.domain.Domaine;
import com.trouvetonprof.repository.DomaineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing Domaine.
 */
@Service
@Transactional
public class DomaineService {

    private final Logger log = LoggerFactory.getLogger(DomaineService.class);

    private final DomaineRepository domaineRepository;

    public DomaineService(DomaineRepository domaineRepository) {
        this.domaineRepository = domaineRepository;
    }

    /**
     * Save a domaine.
     *
     * @param domaine the entity to save
     * @return the persisted entity
     */
    public Domaine save(Domaine domaine) {
        log.debug("Request to save Domaine : {}", domaine);
        return domaineRepository.save(domaine);
    }

    /**
     * Get all the domaines.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Domaine> findAll() {
        log.debug("Request to get all Domaines");
        return domaineRepository.findAll();
    }



    /**
     *  get all the domaines where Annonce is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Domaine> findAllWhereAnnonceIsNull() {
        log.debug("Request to get all domaines where Annonce is null");
        return StreamSupport
            .stream(domaineRepository.findAll().spliterator(), false)
            .filter(domaine -> domaine.getAnnonce() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one domaine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Domaine> findOne(Long id) {
        log.debug("Request to get Domaine : {}", id);
        return domaineRepository.findById(id);
    }

    /**
     * Delete the domaine by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Domaine : {}", id);
        domaineRepository.deleteById(id);
    }
}
