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
import com.trouvetonprof.domain.Matiere;
import com.trouvetonprof.service.MatiereService;
import com.trouvetonprof.web.rest.errors.BadRequestAlertException;
import com.trouvetonprof.web.rest.util.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing Matiere.
 */
@RestController
@RequestMapping("/api")
public class MatiereResource {

	private final Logger log = LoggerFactory.getLogger(MatiereResource.class);

	private static final String ENTITY_NAME = "matiere";

	private final MatiereService matiereService;

	public MatiereResource(MatiereService matiereService) {
		this.matiereService = matiereService;
	}

	/**
	 * POST  /matieres : Create a new matiere.
	 *
	 * @param matiere the matiere to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new matiere, or with status 400 (Bad Request) if the matiere has already an ID
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PostMapping("/matieres")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Matiere> createMatiere(@Valid @RequestBody Matiere matiere) throws URISyntaxException {
		log.debug("REST request to save Matiere : {}", matiere);
		if (matiere.getId() != null) {
			throw new BadRequestAlertException("A new matiere cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Matiere result = matiereService.save(matiere);
		return ResponseEntity.created(new URI("/api/matieres/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * PUT  /matieres : Updates an existing matiere.
	 *
	 * @param matiere the matiere to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated matiere,
	 * or with status 400 (Bad Request) if the matiere is not valid,
	 * or with status 500 (Internal Server Error) if the matiere couldn't be updated
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PutMapping("/matieres")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Matiere> updateMatiere(@Valid @RequestBody Matiere matiere) throws URISyntaxException {
		log.debug("REST request to update Matiere : {}", matiere);
		if (matiere.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Matiere result = matiereService.save(matiere);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, matiere.getId().toString()))
				.body(result);
	}

	/**
	 * GET  /matieres : get all the matieres.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of matieres in body
	 */
	@GetMapping("/matieres")
	@Timed
	public List<Matiere> getAllMatieres() {
		log.debug("REST request to get all Matieres");
		return matiereService.findAll();
	}

	/**
	 * GET  /matieres/:id : get the "id" matiere.
	 *
	 * @param id the id of the matiere to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the matiere, or with status 404 (Not Found)
	 */
	@GetMapping("/matieres/{id}")
	@Timed
	public ResponseEntity<Matiere> getMatiere(@PathVariable Long id) {
		log.debug("REST request to get Matiere : {}", id);
		Optional<Matiere> matiere = matiereService.findOne(id);
		return ResponseUtil.wrapOrNotFound(matiere);
	}

	/**
	 * DELETE  /matieres/:id : delete the "id" matiere.
	 *
	 * @param id the id of the matiere to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/matieres/{id}")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteMatiere(@PathVariable Long id) {
		log.debug("REST request to delete Matiere : {}", id);
		matiereService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}
}
