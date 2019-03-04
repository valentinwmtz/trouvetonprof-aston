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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.trouvetonprof.domain.Domaine;
import com.trouvetonprof.service.DomaineService;
import com.trouvetonprof.web.rest.errors.BadRequestAlertException;
import com.trouvetonprof.web.rest.util.HeaderUtil;

import io.github.jhipster.web.util.ResponseUtil;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Domaine.
 */
@RestController
@RequestMapping("/api")
public class DomaineResource {

	private final Logger log = LoggerFactory.getLogger(DomaineResource.class);

	private static final String ENTITY_NAME = "domaine";

	private final DomaineService domaineService;

	public DomaineResource(DomaineService domaineService) {
		this.domaineService = domaineService;
	}

	/**
	 * POST  /domaines : Create a new domaine.
	 *
	 * @param domaine the domaine to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new domaine, or with status 400 (Bad Request) if the domaine has already an ID
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PostMapping("/domaines")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Domaine> createDomaine(@Valid @RequestBody Domaine domaine) throws URISyntaxException {
		log.debug("REST request to save Domaine : {}", domaine);
		if (domaine.getId() != null) {
			throw new BadRequestAlertException("A new domaine cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Domaine result = domaineService.save(domaine);
		return ResponseEntity.created(new URI("/api/domaines/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * PUT  /domaines : Updates an existing domaine.
	 *
	 * @param domaine the domaine to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated domaine,
	 * or with status 400 (Bad Request) if the domaine is not valid,
	 * or with status 500 (Internal Server Error) if the domaine couldn't be updated
	 * @throws URISyntaxException if the Location URI syntax is incorrect
	 */
	@PutMapping("/domaines")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Domaine> updateDomaine(@Valid @RequestBody Domaine domaine) throws URISyntaxException {
		log.debug("REST request to update Domaine : {}", domaine);
		if (domaine.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Domaine result = domaineService.save(domaine);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, domaine.getId().toString()))
				.body(result);
	}

    /**
     * GET  /domaines : get all the domaines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of domaines in body
     */
    @GetMapping("/domaines")
    @Timed
    public List<Domaine> getAllDomaines() {
        log.debug("REST request to get all Domaines");
        return domaineService.findAll();
    }

	/**
	 * GET  /domaines/:id : get the "id" domaine.
	 *
	 * @param id the id of the domaine to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the domaine, or with status 404 (Not Found)
	 */
	@GetMapping("/domaines/{id}")
	@Timed
	public ResponseEntity<Domaine> getDomaine(@PathVariable Long id) {
		log.debug("REST request to get Domaine : {}", id);
		Optional<Domaine> domaine = domaineService.findOne(id);
		return ResponseUtil.wrapOrNotFound(domaine);
	}

	/**
	 * DELETE  /domaines/:id : delete the "id" domaine.
	 *
	 * @param id the id of the domaine to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/domaines/{id}")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteDomaine(@PathVariable Long id) {
		log.debug("REST request to delete Domaine : {}", id);
		domaineService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}
}
