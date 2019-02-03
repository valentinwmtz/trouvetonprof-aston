package com.trouvetonprof.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.trouvetonprof.domain.enumeration.Satut;

/**
 * A Annonce.
 */
@Entity
@Table(name = "annonce")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Annonce implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 60)
    @Column(name = "titre", length = 60, nullable = false)
    private String titre;

    @NotNull
    @Size(max = 8000)
    @Column(name = "description", length = 8000, nullable = false)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Satut status;

    @ManyToOne
    @JsonIgnoreProperties("userAnnonces")
    private Profil profil;

    @OneToOne    @JoinColumn(unique = true)
    private Domaine domaine;

    @OneToMany(mappedBy = "annonce")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Disponibilite> annonceDisponibilites = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public Annonce titre(String titre) {
        this.titre = titre;
        return this;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public Annonce description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Satut getStatus() {
        return status;
    }

    public Annonce status(Satut status) {
        this.status = status;
        return this;
    }

    public void setStatus(Satut status) {
        this.status = status;
    }

    public Profil getProfil() {
        return profil;
    }

    public Annonce profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Domaine getDomaine() {
        return domaine;
    }

    public Annonce domaine(Domaine domaine) {
        this.domaine = domaine;
        return this;
    }

    public void setDomaine(Domaine domaine) {
        this.domaine = domaine;
    }

    public Set<Disponibilite> getAnnonceDisponibilites() {
        return annonceDisponibilites;
    }

    public Annonce annonceDisponibilites(Set<Disponibilite> disponibilites) {
        this.annonceDisponibilites = disponibilites;
        return this;
    }

    public Annonce addAnnonceDisponibilite(Disponibilite disponibilite) {
        this.annonceDisponibilites.add(disponibilite);
        disponibilite.setAnnonce(this);
        return this;
    }

    public Annonce removeAnnonceDisponibilite(Disponibilite disponibilite) {
        this.annonceDisponibilites.remove(disponibilite);
        disponibilite.setAnnonce(null);
        return this;
    }

    public void setAnnonceDisponibilites(Set<Disponibilite> disponibilites) {
        this.annonceDisponibilites = disponibilites;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Annonce annonce = (Annonce) o;
        if (annonce.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), annonce.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Annonce{" +
            "id=" + getId() +
            ", titre='" + getTitre() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
