package com.trouvetonprof.web.rest;

import com.trouvetonprof.TrouvetonprofApp;

import com.trouvetonprof.domain.Cours;
import com.trouvetonprof.repository.CoursRepository;
import com.trouvetonprof.service.CoursService;
import com.trouvetonprof.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.trouvetonprof.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CoursResource REST controller.
 *
 * @see CoursResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrouvetonprofApp.class)
public class CoursResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_DUREE = 1D;
    private static final Double UPDATED_DUREE = 2D;

    private static final Integer DEFAULT_NOTE = 0;
    private static final Integer UPDATED_NOTE = 1;

    private static final Integer DEFAULT_PRIX = 1;
    private static final Integer UPDATED_PRIX = 2;

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    @Autowired
    private CoursRepository coursRepository;

    @Autowired
    private CoursService coursService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCoursMockMvc;

    private Cours cours;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CoursResource coursResource = new CoursResource(coursService);
        this.restCoursMockMvc = MockMvcBuilders.standaloneSetup(coursResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cours createEntity(EntityManager em) {
        Cours cours = new Cours()
            .date(DEFAULT_DATE)
            .duree(DEFAULT_DUREE)
            .note(DEFAULT_NOTE)
            .prix(DEFAULT_PRIX)
            .commentaire(DEFAULT_COMMENTAIRE);
        return cours;
    }

    @Before
    public void initTest() {
        cours = createEntity(em);
    }

    @Test
    @Transactional
    public void createCours() throws Exception {
        int databaseSizeBeforeCreate = coursRepository.findAll().size();

        // Create the Cours
        restCoursMockMvc.perform(post("/api/cours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cours)))
            .andExpect(status().isCreated());

        // Validate the Cours in the database
        List<Cours> coursList = coursRepository.findAll();
        assertThat(coursList).hasSize(databaseSizeBeforeCreate + 1);
        Cours testCours = coursList.get(coursList.size() - 1);
        assertThat(testCours.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testCours.getDuree()).isEqualTo(DEFAULT_DUREE);
        assertThat(testCours.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testCours.getPrix()).isEqualTo(DEFAULT_PRIX);
        assertThat(testCours.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void createCoursWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = coursRepository.findAll().size();

        // Create the Cours with an existing ID
        cours.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCoursMockMvc.perform(post("/api/cours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cours)))
            .andExpect(status().isBadRequest());

        // Validate the Cours in the database
        List<Cours> coursList = coursRepository.findAll();
        assertThat(coursList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = coursRepository.findAll().size();
        // set the field null
        cours.setDate(null);

        // Create the Cours, which fails.

        restCoursMockMvc.perform(post("/api/cours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cours)))
            .andExpect(status().isBadRequest());

        List<Cours> coursList = coursRepository.findAll();
        assertThat(coursList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDureeIsRequired() throws Exception {
        int databaseSizeBeforeTest = coursRepository.findAll().size();
        // set the field null
        cours.setDuree(null);

        // Create the Cours, which fails.

        restCoursMockMvc.perform(post("/api/cours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cours)))
            .andExpect(status().isBadRequest());

        List<Cours> coursList = coursRepository.findAll();
        assertThat(coursList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCours() throws Exception {
        // Initialize the database
        coursRepository.saveAndFlush(cours);

        // Get all the coursList
        restCoursMockMvc.perform(get("/api/cours?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cours.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].duree").value(hasItem(DEFAULT_DUREE.doubleValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE)))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX)))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE.toString())));
    }
    
    @Test
    @Transactional
    public void getCours() throws Exception {
        // Initialize the database
        coursRepository.saveAndFlush(cours);

        // Get the cours
        restCoursMockMvc.perform(get("/api/cours/{id}", cours.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cours.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.duree").value(DEFAULT_DUREE.doubleValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCours() throws Exception {
        // Get the cours
        restCoursMockMvc.perform(get("/api/cours/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCours() throws Exception {
        // Initialize the database
        coursService.save(cours);

        int databaseSizeBeforeUpdate = coursRepository.findAll().size();

        // Update the cours
        Cours updatedCours = coursRepository.findById(cours.getId()).get();
        // Disconnect from session so that the updates on updatedCours are not directly saved in db
        em.detach(updatedCours);
        updatedCours
            .date(UPDATED_DATE)
            .duree(UPDATED_DUREE)
            .note(UPDATED_NOTE)
            .prix(UPDATED_PRIX)
            .commentaire(UPDATED_COMMENTAIRE);

        restCoursMockMvc.perform(put("/api/cours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCours)))
            .andExpect(status().isOk());

        // Validate the Cours in the database
        List<Cours> coursList = coursRepository.findAll();
        assertThat(coursList).hasSize(databaseSizeBeforeUpdate);
        Cours testCours = coursList.get(coursList.size() - 1);
        assertThat(testCours.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testCours.getDuree()).isEqualTo(UPDATED_DUREE);
        assertThat(testCours.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testCours.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testCours.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingCours() throws Exception {
        int databaseSizeBeforeUpdate = coursRepository.findAll().size();

        // Create the Cours

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCoursMockMvc.perform(put("/api/cours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cours)))
            .andExpect(status().isBadRequest());

        // Validate the Cours in the database
        List<Cours> coursList = coursRepository.findAll();
        assertThat(coursList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCours() throws Exception {
        // Initialize the database
        coursService.save(cours);

        int databaseSizeBeforeDelete = coursRepository.findAll().size();

        // Get the cours
        restCoursMockMvc.perform(delete("/api/cours/{id}", cours.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cours> coursList = coursRepository.findAll();
        assertThat(coursList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cours.class);
        Cours cours1 = new Cours();
        cours1.setId(1L);
        Cours cours2 = new Cours();
        cours2.setId(cours1.getId());
        assertThat(cours1).isEqualTo(cours2);
        cours2.setId(2L);
        assertThat(cours1).isNotEqualTo(cours2);
        cours1.setId(null);
        assertThat(cours1).isNotEqualTo(cours2);
    }
}
