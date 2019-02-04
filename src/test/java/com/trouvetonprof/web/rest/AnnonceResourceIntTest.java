package com.trouvetonprof.web.rest;

import com.trouvetonprof.TrouvetonprofApp;

import com.trouvetonprof.domain.Annonce;
import com.trouvetonprof.repository.AnnonceRepository;
import com.trouvetonprof.service.AnnonceService;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.trouvetonprof.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.trouvetonprof.domain.enumeration.Satut;
/**
 * Test class for the AnnonceResource REST controller.
 *
 * @see AnnonceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrouvetonprofApp.class)
public class AnnonceResourceIntTest {

    private static final String DEFAULT_TITRE = "AAAAAAAAAA";
    private static final String UPDATED_TITRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Satut DEFAULT_STATUS = Satut.PROFESSEUR;
    private static final Satut UPDATED_STATUS = Satut.ELEVE;

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_ADMIN_VALIDE = false;
    private static final Boolean UPDATED_ADMIN_VALIDE = true;

    private static final Double DEFAULT_PRIX_HORAIRE = 1D;
    private static final Double UPDATED_PRIX_HORAIRE = 2D;

    @Autowired
    private AnnonceRepository annonceRepository;

    @Autowired
    private AnnonceService annonceService;

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

    private MockMvc restAnnonceMockMvc;

    private Annonce annonce;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnnonceResource annonceResource = new AnnonceResource(annonceService);
        this.restAnnonceMockMvc = MockMvcBuilders.standaloneSetup(annonceResource)
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
    public static Annonce createEntity(EntityManager em) {
        Annonce annonce = new Annonce()
            .titre(DEFAULT_TITRE)
            .description(DEFAULT_DESCRIPTION)
            .status(DEFAULT_STATUS)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .adminValide(DEFAULT_ADMIN_VALIDE)
            .prixHoraire(DEFAULT_PRIX_HORAIRE);
        return annonce;
    }

    @Before
    public void initTest() {
        annonce = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnnonce() throws Exception {
        int databaseSizeBeforeCreate = annonceRepository.findAll().size();

        // Create the Annonce
        restAnnonceMockMvc.perform(post("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annonce)))
            .andExpect(status().isCreated());

        // Validate the Annonce in the database
        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeCreate + 1);
        Annonce testAnnonce = annonceList.get(annonceList.size() - 1);
        assertThat(testAnnonce.getTitre()).isEqualTo(DEFAULT_TITRE);
        assertThat(testAnnonce.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAnnonce.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testAnnonce.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testAnnonce.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testAnnonce.isAdminValide()).isEqualTo(DEFAULT_ADMIN_VALIDE);
        assertThat(testAnnonce.getPrixHoraire()).isEqualTo(DEFAULT_PRIX_HORAIRE);
    }

    @Test
    @Transactional
    public void createAnnonceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = annonceRepository.findAll().size();

        // Create the Annonce with an existing ID
        annonce.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnnonceMockMvc.perform(post("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annonce)))
            .andExpect(status().isBadRequest());

        // Validate the Annonce in the database
        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitreIsRequired() throws Exception {
        int databaseSizeBeforeTest = annonceRepository.findAll().size();
        // set the field null
        annonce.setTitre(null);

        // Create the Annonce, which fails.

        restAnnonceMockMvc.perform(post("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annonce)))
            .andExpect(status().isBadRequest());

        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = annonceRepository.findAll().size();
        // set the field null
        annonce.setDescription(null);

        // Create the Annonce, which fails.

        restAnnonceMockMvc.perform(post("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annonce)))
            .andExpect(status().isBadRequest());

        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = annonceRepository.findAll().size();
        // set the field null
        annonce.setStatus(null);

        // Create the Annonce, which fails.

        restAnnonceMockMvc.perform(post("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annonce)))
            .andExpect(status().isBadRequest());

        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixHoraireIsRequired() throws Exception {
        int databaseSizeBeforeTest = annonceRepository.findAll().size();
        // set the field null
        annonce.setPrixHoraire(null);

        // Create the Annonce, which fails.

        restAnnonceMockMvc.perform(post("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annonce)))
            .andExpect(status().isBadRequest());

        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAnnonces() throws Exception {
        // Initialize the database
        annonceRepository.saveAndFlush(annonce);

        // Get all the annonceList
        restAnnonceMockMvc.perform(get("/api/annonces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(annonce.getId().intValue())))
            .andExpect(jsonPath("$.[*].titre").value(hasItem(DEFAULT_TITRE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].adminValide").value(hasItem(DEFAULT_ADMIN_VALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].prixHoraire").value(hasItem(DEFAULT_PRIX_HORAIRE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getAnnonce() throws Exception {
        // Initialize the database
        annonceRepository.saveAndFlush(annonce);

        // Get the annonce
        restAnnonceMockMvc.perform(get("/api/annonces/{id}", annonce.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(annonce.getId().intValue()))
            .andExpect(jsonPath("$.titre").value(DEFAULT_TITRE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.adminValide").value(DEFAULT_ADMIN_VALIDE.booleanValue()))
            .andExpect(jsonPath("$.prixHoraire").value(DEFAULT_PRIX_HORAIRE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAnnonce() throws Exception {
        // Get the annonce
        restAnnonceMockMvc.perform(get("/api/annonces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnnonce() throws Exception {
        // Initialize the database
        annonceService.save(annonce);

        int databaseSizeBeforeUpdate = annonceRepository.findAll().size();

        // Update the annonce
        Annonce updatedAnnonce = annonceRepository.findById(annonce.getId()).get();
        // Disconnect from session so that the updates on updatedAnnonce are not directly saved in db
        em.detach(updatedAnnonce);
        updatedAnnonce
            .titre(UPDATED_TITRE)
            .description(UPDATED_DESCRIPTION)
            .status(UPDATED_STATUS)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .adminValide(UPDATED_ADMIN_VALIDE)
            .prixHoraire(UPDATED_PRIX_HORAIRE);

        restAnnonceMockMvc.perform(put("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnnonce)))
            .andExpect(status().isOk());

        // Validate the Annonce in the database
        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeUpdate);
        Annonce testAnnonce = annonceList.get(annonceList.size() - 1);
        assertThat(testAnnonce.getTitre()).isEqualTo(UPDATED_TITRE);
        assertThat(testAnnonce.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAnnonce.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testAnnonce.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testAnnonce.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testAnnonce.isAdminValide()).isEqualTo(UPDATED_ADMIN_VALIDE);
        assertThat(testAnnonce.getPrixHoraire()).isEqualTo(UPDATED_PRIX_HORAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingAnnonce() throws Exception {
        int databaseSizeBeforeUpdate = annonceRepository.findAll().size();

        // Create the Annonce

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAnnonceMockMvc.perform(put("/api/annonces")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(annonce)))
            .andExpect(status().isBadRequest());

        // Validate the Annonce in the database
        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAnnonce() throws Exception {
        // Initialize the database
        annonceService.save(annonce);

        int databaseSizeBeforeDelete = annonceRepository.findAll().size();

        // Get the annonce
        restAnnonceMockMvc.perform(delete("/api/annonces/{id}", annonce.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Annonce> annonceList = annonceRepository.findAll();
        assertThat(annonceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Annonce.class);
        Annonce annonce1 = new Annonce();
        annonce1.setId(1L);
        Annonce annonce2 = new Annonce();
        annonce2.setId(annonce1.getId());
        assertThat(annonce1).isEqualTo(annonce2);
        annonce2.setId(2L);
        assertThat(annonce1).isNotEqualTo(annonce2);
        annonce1.setId(null);
        assertThat(annonce1).isNotEqualTo(annonce2);
    }
}
