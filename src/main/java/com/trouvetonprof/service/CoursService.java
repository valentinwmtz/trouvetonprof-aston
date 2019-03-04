package com.trouvetonprof.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trouvetonprof.domain.Cours;
import com.trouvetonprof.repository.CoursRepository;
import com.trouvetonprof.repository.ProfilRepository;
import com.trouvetonprof.security.AuthoritiesConstants;
import com.trouvetonprof.security.SecurityUtils;

/**
 * Service Implementation for managing Cours.
 */
@Service
@Transactional
public class CoursService {

	private final Logger log = LoggerFactory.getLogger(CoursService.class);

	private final CoursRepository coursRepository;
	private final ProfilRepository profilRepository;
	public CoursService(CoursRepository coursRepository, ProfilRepository profilRepository) {
		this.coursRepository = coursRepository;
		this.profilRepository = profilRepository;
	}

	/**
	 * Save a cours.
	 *
	 * @param cours the entity to save
	 * @return the persisted entity
	 */
	public Cours save(Cours cours) {
		log.debug("Request to save Cours : {}", cours);
		if (cours.getId() == null) {
			cours.setCours(this.profilRepository.findFirstByUserLogin(SecurityUtils.getCurrentUserLogin().get()));
		}
		return coursRepository.save(cours);
	}

	/**
	 * Get all the cours.
	 *
	 * @return the list of entities
	 */
	@Transactional(readOnly = true)
	public List<Cours> findAll() {
		log.debug("Request to get all Cours");

		if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
			return coursRepository.findAll();
		} else {

			List<Cours> list = new ArrayList<Cours>();
			list.addAll(coursRepository.findAllByAnnonceProfilUserLogin(SecurityUtils.getCurrentUserLogin().get()))
			;			list.addAll(coursRepository.findAllByCoursId(profilRepository.findFirstByUserLogin(SecurityUtils.getCurrentUserLogin().get()).getId()));

			return list;
		}
	}


	/**
	 * Get one cours by id.
	 *
	 * @param id the id of the entity
	 * @return the entity
	 */
	@Transactional(readOnly = true)
	public Optional<Cours> findOne(Long id) {
		log.debug("Request to get Cours : {}", id);
		return coursRepository.findById(id);
	}

	/**
	 * Get moyenne of notes by annoce id.
	 *
	 * @param id the id of the entity
	 * @return moyenne of notes
	 */
	@Transactional(readOnly = true)
	public double findNoteMoyenneByAnnonceId(Long id) {
		log.debug("Request to get moyenne of notes by annonce id : {}", id);
		return coursRepository.findByAnnonceId(id).stream().filter(cours -> cours.getNote() != null)
				.mapToDouble(Cours::getNote)
				.average()
				.orElse(-1);
	}

	/**
	 * Get moyenne of notes by annoce id.
	 *
	 * @param id the id of the entity
	 * @return moyenne of notes
	 */
	@Transactional(readOnly = true)
	public double findNoteMoyenneByAnnonceId1(Long id) {
		log.debug("Request to get moyenne of notes by annonce id : {}", id);
		return coursRepository.findByAnnonceId(id).stream()
				.mapToDouble(Cours::getNote)
				.average()
				.orElse(-1);
	}

	/**
	 * Get cours by annoce id.
	 *
	 * @param id the id of the entity
	 * @return Liste of Cours
	 */
	@Transactional(readOnly = true)
	public List<Cours> findCoursByAnnonceId(Long id) {
		log.debug("Request to get cours by annonce id : {}", id);
		return coursRepository.findByAnnonceId(id);
	}

}
