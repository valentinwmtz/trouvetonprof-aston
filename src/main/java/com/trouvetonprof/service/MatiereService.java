package com.trouvetonprof.service;

import com.trouvetonprof.domain.Matiere;
import com.trouvetonprof.repository.MatiereRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Matiere.
 */
@Service
@Transactional
public class MatiereService {

    private final Logger log = LoggerFactory.getLogger(MatiereService.class);

    private final MatiereRepository matiereRepository;

    public MatiereService(MatiereRepository matiereRepository) {
        this.matiereRepository = matiereRepository;
    }

    /**
     * Save a matiere.
     *
     * @param matiere the entity to save
     * @return the persisted entity
     */
    public Matiere save(Matiere matiere) {
        log.debug("Request to save Matiere : {}", matiere);
        return matiereRepository.save(matiere);
    }

    /**
     * Get all the matieres.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Matiere> findAll() {
        log.debug("Request to get all Matieres");
        return matiereRepository.findAll();
    }


    /**
     * Get one matiere by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Matiere> findOne(Long id) {
        log.debug("Request to get Matiere : {}", id);
        return matiereRepository.findById(id);
    }

    /**
     * Delete the matiere by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Matiere : {}", id);        matiereRepository.deleteById(id);
    }
}
