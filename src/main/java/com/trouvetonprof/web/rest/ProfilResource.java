package com.trouvetonprof.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.trouvetonprof.domain.Profil;
import com.trouvetonprof.service.ProfilService;
import com.trouvetonprof.web.rest.errors.BadRequestAlertException;
import com.trouvetonprof.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Profil.
 */
@RestController
@RequestMapping("/api")
public class ProfilResource {

    private final Logger log = LoggerFactory.getLogger(ProfilResource.class);

    private static final String ENTITY_NAME = "profil";

    private final ProfilService profilService;

    public ProfilResource(ProfilService profilService) {
        this.profilService = profilService;
    }

    /**
     * POST  /profils : Create a new profil.
     *
     * @param profil the profil to create
     * @return the ResponseEntity with status 201 (Created) and with body the new profil, or with status 400 (Bad Request) if the profil has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/profils")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Profil> createProfil(@Valid @RequestBody Profil profil) throws URISyntaxException {
        log.debug("REST request to save Profil : {}", profil);
        if (profil.getId() != null) {
            throw new BadRequestAlertException("A new profil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profil result = profilService.save(profil);
        return ResponseEntity.created(new URI("/api/profils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /profils : Updates an existing profil.
     *
     * @param profil the profil to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated profil,
     * or with status 400 (Bad Request) if the profil is not valid,
     * or with status 500 (Internal Server Error) if the profil couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/profils")
    @Timed
    public ResponseEntity<Profil> updateProfil(@Valid @RequestBody Profil profil) throws URISyntaxException {
        log.debug("REST request to update Profil : {}", profil);
        if (profil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Profil result = profilService.save(profil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, profil.getId().toString()))
            .body(result);
    }

    /**
     * GET  /profils : get all the profils.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of profils in body
     */
    @GetMapping("/profils")
    @Timed
    public List<Profil> getAllProfils() {
        log.debug("REST request to get all Profils");
        return profilService.findAll();
    }

    /**
     * GET  /profils/:id : get the "id" profil.
     *
     * @param id the id of the profil to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the profil, or with status 404 (Not Found)
     */
    @GetMapping("/profils/{id}")
    @Timed
    public ResponseEntity<Profil> getProfil(@PathVariable Long id) {
        log.debug("REST request to get Profil : {}", id);
        Optional<Profil> profil = profilService.findOne(id);
        return ResponseUtil.wrapOrNotFound(profil);
    }

    /**
     * DELETE  /profils/:id : delete the "id" profil.
     *
     * @param id the id of the profil to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/profils/{id}")
    @Timed
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteProfil(@PathVariable Long id) {
        log.debug("REST request to delete Profil : {}", id);
        profilService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
