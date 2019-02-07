package com.trouvetonprof.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.trouvetonprof.domain.Disponibilite;
import com.trouvetonprof.service.DisponibiliteService;
import com.trouvetonprof.web.rest.errors.BadRequestAlertException;
import com.trouvetonprof.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Disponibilite.
 */
@RestController
@RequestMapping("/api")
public class DisponibiliteResource {

    private final Logger log = LoggerFactory.getLogger(DisponibiliteResource.class);

    private static final String ENTITY_NAME = "disponibilite";

    private final DisponibiliteService disponibiliteService;

    public DisponibiliteResource(DisponibiliteService disponibiliteService) {
        this.disponibiliteService = disponibiliteService;
    }

    /**
     * POST  /disponibilites : Create a new disponibilite.
     *
     * @param disponibilite the disponibilite to create
     * @return the ResponseEntity with status 201 (Created) and with body the new disponibilite, or with status 400 (Bad Request) if the disponibilite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/disponibilites")
    @Timed
    public ResponseEntity<Disponibilite> createDisponibilite(@Valid @RequestBody Disponibilite disponibilite) throws URISyntaxException {
        log.debug("REST request to save Disponibilite : {}", disponibilite);
        if (disponibilite.getId() != null) {
            throw new BadRequestAlertException("A new disponibilite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Disponibilite result = disponibiliteService.save(disponibilite);
        return ResponseEntity.created(new URI("/api/disponibilites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /disponibilites : Updates an existing disponibilite.
     *
     * @param disponibilite the disponibilite to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated disponibilite,
     * or with status 400 (Bad Request) if the disponibilite is not valid,
     * or with status 500 (Internal Server Error) if the disponibilite couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/disponibilites")
    @Timed
    public ResponseEntity<Disponibilite> updateDisponibilite(@Valid @RequestBody Disponibilite disponibilite) throws URISyntaxException {
        log.debug("REST request to update Disponibilite : {}", disponibilite);
        if (disponibilite.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Disponibilite result = disponibiliteService.save(disponibilite);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, disponibilite.getId().toString()))
            .body(result);
    }

    /**
     * GET  /disponibilites : get all the disponibilites.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of disponibilites in body
     */
    @GetMapping("/disponibilites")
    @Timed
    public List<Disponibilite> getAllDisponibilites() {
        log.debug("REST request to get all Disponibilites");
        return disponibiliteService.findAll();
    }

    /**
     * GET  /disponibilites/:id : get the "id" disponibilite.
     *
     * @param id the id of the disponibilite to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the disponibilite, or with status 404 (Not Found)
     */
    @GetMapping("/disponibilites/{id}")
    @Timed
    public ResponseEntity<Disponibilite> getDisponibilite(@PathVariable Long id) {
        log.debug("REST request to get Disponibilite : {}", id);
        Optional<Disponibilite> disponibilite = disponibiliteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(disponibilite);
    }

    /**
     * DELETE  /disponibilites/:id : delete the "id" disponibilite.
     *
     * @param id the id of the disponibilite to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/disponibilites/{id}")
    @Timed
    public ResponseEntity<Void> deleteDisponibilite(@PathVariable Long id) {
        log.debug("REST request to delete Disponibilite : {}", id);
        disponibiliteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /disponibilites/:id : get the "id" disponibilite.
     *
     * @param id the id of the annonce to retrieve disponibilite
     * @return the ResponseEntity with status 200 (OK) and with body the disponibilite, or with status 404 (Not Found)
     */
    @GetMapping("/disponibilites/annonce/{annonceId}/")
    @Timed
    public List<Disponibilite> getDisponibiliteByAnnonceId(@PathVariable(value="annonceId") Long id) {
        log.debug("REST request to get Disponibilite by annonce Id : {}", id);
        return disponibiliteService.findByAnnonceId(id);

    }
}
