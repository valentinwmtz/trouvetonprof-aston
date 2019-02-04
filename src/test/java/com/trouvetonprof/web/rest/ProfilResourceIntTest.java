package com.trouvetonprof.web.rest;

import com.trouvetonprof.TrouvetonprofApp;

import com.trouvetonprof.domain.Profil;
import com.trouvetonprof.repository.ProfilRepository;
import com.trouvetonprof.service.ProfilService;
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

import com.trouvetonprof.domain.enumeration.Sexe;
/**
 * Test class for the ProfilResource REST controller.
 *
 * @see ProfilResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrouvetonprofApp.class)
public class ProfilResourceIntTest {

    private static final Instant DEFAULT_DATE_NAISSANCE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_NAISSANCE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PAYS = "AAAAAAAAAA";
    private static final String UPDATED_PAYS = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final Sexe DEFAULT_SEXE = Sexe.HOMME;
    private static final Sexe UPDATED_SEXE = Sexe.FEMME;

    @Autowired
    private ProfilRepository profilRepository;

    @Autowired
    private ProfilService profilService;

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

    private MockMvc restProfilMockMvc;

    private Profil profil;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfilResource profilResource = new ProfilResource(profilService);
        this.restProfilMockMvc = MockMvcBuilders.standaloneSetup(profilResource)
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
    public static Profil createEntity(EntityManager em) {
        Profil profil = new Profil()
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .pays(DEFAULT_PAYS)
            .adresse(DEFAULT_ADRESSE)
            .telephone(DEFAULT_TELEPHONE)
            .sexe(DEFAULT_SEXE);
        return profil;
    }

    @Before
    public void initTest() {
        profil = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfil() throws Exception {
        int databaseSizeBeforeCreate = profilRepository.findAll().size();

        // Create the Profil
        restProfilMockMvc.perform(post("/api/profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profil)))
            .andExpect(status().isCreated());

        // Validate the Profil in the database
        List<Profil> profilList = profilRepository.findAll();
        assertThat(profilList).hasSize(databaseSizeBeforeCreate + 1);
        Profil testProfil = profilList.get(profilList.size() - 1);
        assertThat(testProfil.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testProfil.getPays()).isEqualTo(DEFAULT_PAYS);
        assertThat(testProfil.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testProfil.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testProfil.getSexe()).isEqualTo(DEFAULT_SEXE);
    }

    @Test
    @Transactional
    public void createProfilWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profilRepository.findAll().size();

        // Create the Profil with an existing ID
        profil.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfilMockMvc.perform(post("/api/profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profil)))
            .andExpect(status().isBadRequest());

        // Validate the Profil in the database
        List<Profil> profilList = profilRepository.findAll();
        assertThat(profilList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateNaissanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilRepository.findAll().size();
        // set the field null
        profil.setDateNaissance(null);

        // Create the Profil, which fails.

        restProfilMockMvc.perform(post("/api/profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profil)))
            .andExpect(status().isBadRequest());

        List<Profil> profilList = profilRepository.findAll();
        assertThat(profilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSexeIsRequired() throws Exception {
        int databaseSizeBeforeTest = profilRepository.findAll().size();
        // set the field null
        profil.setSexe(null);

        // Create the Profil, which fails.

        restProfilMockMvc.perform(post("/api/profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profil)))
            .andExpect(status().isBadRequest());

        List<Profil> profilList = profilRepository.findAll();
        assertThat(profilList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfils() throws Exception {
        // Initialize the database
        profilRepository.saveAndFlush(profil);

        // Get all the profilList
        restProfilMockMvc.perform(get("/api/profils?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profil.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].pays").value(hasItem(DEFAULT_PAYS.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].sexe").value(hasItem(DEFAULT_SEXE.toString())));
    }
    
    @Test
    @Transactional
    public void getProfil() throws Exception {
        // Initialize the database
        profilRepository.saveAndFlush(profil);

        // Get the profil
        restProfilMockMvc.perform(get("/api/profils/{id}", profil.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(profil.getId().intValue()))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.pays").value(DEFAULT_PAYS.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.sexe").value(DEFAULT_SEXE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfil() throws Exception {
        // Get the profil
        restProfilMockMvc.perform(get("/api/profils/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfil() throws Exception {
        // Initialize the database
        profilService.save(profil);

        int databaseSizeBeforeUpdate = profilRepository.findAll().size();

        // Update the profil
        Profil updatedProfil = profilRepository.findById(profil.getId()).get();
        // Disconnect from session so that the updates on updatedProfil are not directly saved in db
        em.detach(updatedProfil);
        updatedProfil
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .pays(UPDATED_PAYS)
            .adresse(UPDATED_ADRESSE)
            .telephone(UPDATED_TELEPHONE)
            .sexe(UPDATED_SEXE);

        restProfilMockMvc.perform(put("/api/profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfil)))
            .andExpect(status().isOk());

        // Validate the Profil in the database
        List<Profil> profilList = profilRepository.findAll();
        assertThat(profilList).hasSize(databaseSizeBeforeUpdate);
        Profil testProfil = profilList.get(profilList.size() - 1);
        assertThat(testProfil.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testProfil.getPays()).isEqualTo(UPDATED_PAYS);
        assertThat(testProfil.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testProfil.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testProfil.getSexe()).isEqualTo(UPDATED_SEXE);
    }

    @Test
    @Transactional
    public void updateNonExistingProfil() throws Exception {
        int databaseSizeBeforeUpdate = profilRepository.findAll().size();

        // Create the Profil

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfilMockMvc.perform(put("/api/profils")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(profil)))
            .andExpect(status().isBadRequest());

        // Validate the Profil in the database
        List<Profil> profilList = profilRepository.findAll();
        assertThat(profilList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfil() throws Exception {
        // Initialize the database
        profilService.save(profil);

        int databaseSizeBeforeDelete = profilRepository.findAll().size();

        // Delete the profil
        restProfilMockMvc.perform(delete("/api/profils/{id}", profil.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Profil> profilList = profilRepository.findAll();
        assertThat(profilList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Profil.class);
        Profil profil1 = new Profil();
        profil1.setId(1L);
        Profil profil2 = new Profil();
        profil2.setId(profil1.getId());
        assertThat(profil1).isEqualTo(profil2);
        profil2.setId(2L);
        assertThat(profil1).isNotEqualTo(profil2);
        profil1.setId(null);
        assertThat(profil1).isNotEqualTo(profil2);
    }
}
