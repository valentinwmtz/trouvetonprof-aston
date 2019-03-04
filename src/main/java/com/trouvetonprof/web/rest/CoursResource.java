package com.trouvetonprof.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.trouvetonprof.domain.Cours;
import com.trouvetonprof.service.CoursService;
import com.trouvetonprof.web.rest.errors.BadRequestAlertException;
import com.trouvetonprof.web.rest.util.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Cours.
 */
@RestController
@RequestMapping("/api")
public class CoursResource {

	private final Logger log = LoggerFactory.getLogger(CoursResource.class);

	private static final String ENTITY_NAME = "cours";

	private final CoursService coursService;

	public CoursResource(CoursService coursService) {
		this.coursService = coursService;
	}

	/**
	 * POST  /cours : Create a new cours.
	 *
	 * @param cours the cours to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new cours, or with status 400 (Bad Request) if the cours has already an ID
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PostMapping("/cours")
	@Timed
	public ResponseEntity<Cours> createCours(@Valid @RequestBody Cours cours) throws URISyntaxException {
		log.debug("REST request to save Cours : {}", cours);
		if (cours.getId() != null) {
			throw new BadRequestAlertException("A new cours cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Cours result = coursService.save(cours);
		return ResponseEntity.created(new URI("/api/cours/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * PUT  /cours : Updates an existing cours.
	 *
	 * @param cours the cours to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated cours,
	 * or with status 400 (Bad Request) if the cours is not valid,
	 * or with status 500 (Internal Server Error) if the cours couldn't be updated
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PutMapping("/cours")
	@Timed
	public ResponseEntity<Cours> updateCours(@Valid @RequestBody Cours cours) throws URISyntaxException {
		log.debug("REST request to update Cours : {}", cours);
		if (cours.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Cours result = coursService.save(cours);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cours.getId().toString()))
				.body(result);
	}

	/**
	 * GET  /cours : get all the cours.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of cours in body
	 */
	@GetMapping("/cours")
	@Timed
	public List<Cours> getAllCours() {
		log.debug("REST request to get all Cours");
		return coursService.findAll();
	}

	/**
	 * GET  /cours/:id : get the "id" cours.
	 *
	 * @param id the id of the cours to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the cours, or with status 404 (Not Found)
	 */
	@GetMapping("/cours/{id}")
	@Timed
	public ResponseEntity<Cours> getCours(@PathVariable Long id) {
		log.debug("REST request to get Cours : {}", id);
		Optional<Cours> cours = coursService.findOne(id);
		return ResponseUtil.wrapOrNotFound(cours);
	}

	/**
	 * DELETE  /cours/:id : delete the "id" cours.
	 *
	 * @param id the id of the cours to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/cours/{id}")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteCours(@PathVariable Long id) {
		log.debug("REST request to delete Cours : {}", id);
		coursService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}

	/**
	 * GET  /cours/moyenne/notes/:id : get the moyenne of notes by annonce "id".
	 *
	 * @param id the id of the annonce to retrieve disponibilite
	 * @return the ResponseEntity with status 200 (OK) and with body the disponibilite, or with status 404 (Not Found)
	 */
	@GetMapping("/cours/moyenne/notes/{annonceId}")
	@Timed
	public double getDisponibiliteByAnnonceId(@PathVariable(value = "annonceId") Long id) {
		log.debug("REST request to get moyenne of notes by annonce Id : {}", id);
		return coursService.findNoteMoyenneByAnnonceId(id);
	}


	/**
	 * GET /cours/commentaires/:id : get the cours by annonce "id".
	 *
	 * @param id the id of the annonce to retrieve cours
	 * @return the ResponseEntity with status 200 (OK) and with body the disponibilite, or with status 404 (Not Found)
	 */
	@GetMapping("/cours/annonce/{annonceId}")
	@Timed
	public List<Cours> getCoursByAnnonceId(@PathVariable(value = "annonceId") Long id) {
		log.debug("REST request to get cours by annonce Id : {}", id);
		return coursService.findCoursByAnnonceId(id);
	}
}
