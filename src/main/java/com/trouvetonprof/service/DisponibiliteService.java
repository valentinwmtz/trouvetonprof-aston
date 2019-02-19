package com.trouvetonprof.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trouvetonprof.domain.Disponibilite;
import com.trouvetonprof.repository.DisponibiliteRepository;
import com.trouvetonprof.security.AuthoritiesConstants;
import com.trouvetonprof.security.SecurityUtils;

/**
 * Service Implementation for managing Disponibilite.
 */
@Service
@Transactional
public class DisponibiliteService {

	private final Logger log = LoggerFactory.getLogger(DisponibiliteService.class);

	private final DisponibiliteRepository disponibiliteRepository;

	public DisponibiliteService(DisponibiliteRepository disponibiliteRepository) {
		this.disponibiliteRepository = disponibiliteRepository;
	}

	/**
	 * Save a disponibilite.
	 *
	 * @param disponibilite the entity to save
	 * @return the persisted entity
	 */
	public Disponibilite save(Disponibilite disponibilite) {
		log.debug("Request to save Disponibilite : {}", disponibilite);
		return disponibiliteRepository.save(disponibilite);
	}

	/**
	 * Get all the disponibilites.
	 *
	 * @return the list of entities
	 */
	@Transactional(readOnly = true)
	public List<Disponibilite> findAll() {
		log.debug("Request to get all Disponibilites");
		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return disponibiliteRepository.findAll();
		} else {
			return disponibiliteRepository.findAllByAnnonceProfilUserLogin(SecurityUtils.getCurrentUserLogin().get());
		}
	}


	/**
	 * Get one disponibilite by id.
	 *
	 * @param id the id of the entity
	 * @return the entity
	 */
	@Transactional(readOnly = true)
	public Optional<Disponibilite> findOne(Long id) {
		log.debug("Request to get Disponibilite : {}", id);
		return disponibiliteRepository.findById(id);
	}

	/**
	 * Delete the disponibilite by id.
	 *
	 * @param id the id of the entity
	 */
	public void delete(Long id) {
		log.debug("Request to delete Disponibilite : {}", id);
		disponibiliteRepository.deleteById(id);
	}


	/**
	 * Get one disponibilite by annoce id.
	 *
	 * @param id the id of the entity
	 * @return the entity
	 */
	@Transactional(readOnly = true)
	public List<Disponibilite> findByAnnonceId(Long id) {
		log.debug("Request to get Disponibilite by annonce id : {}", id);
		return disponibiliteRepository.findByAnnonceId(id);
	}
}
