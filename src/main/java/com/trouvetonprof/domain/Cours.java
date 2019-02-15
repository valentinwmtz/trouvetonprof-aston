package com.trouvetonprof.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cours.
 */
@Entity
@Table(name = "cours")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cours implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @NotNull
    @Column(name = "duree", nullable = false)
    private Double duree;

    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "note")
    private Integer note;

    @Column(name = "prix")
    private Integer prix;

    @Column(name = "commentaire")
    private String commentaire;

    @ManyToOne
    @JsonIgnoreProperties("annonceCours")
    private Annonce annonce;

    @OneToMany(mappedBy = "cours")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Profil> coursAnnonces = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Cours date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getDuree() {
        return duree;
    }

    public Cours duree(Double duree) {
        this.duree = duree;
        return this;
    }

    public void setDuree(Double duree) {
        this.duree = duree;
    }

    public Integer getNote() {
        return note;
    }

    public Cours note(Integer note) {
        this.note = note;
        return this;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public Integer getPrix() {
        return prix;
    }

    public Cours prix(Integer prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Integer prix) {
        this.prix = prix;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Cours commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public Cours annonce(Annonce annonce) {
        this.annonce = annonce;
        return this;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
    }

    public Set<Profil> getCoursAnnonces() {
        return coursAnnonces;
    }

    public Cours coursAnnonces(Set<Profil> profils) {
        this.coursAnnonces = profils;
        return this;
    }

    public Cours addCoursAnnonce(Profil profil) {
        this.coursAnnonces.add(profil);
        profil.setCours(this);
        return this;
    }

    public Cours removeCoursAnnonce(Profil profil) {
        this.coursAnnonces.remove(profil);
        profil.setCours(null);
        return this;
    }

    public void setCoursAnnonces(Set<Profil> profils) {
        this.coursAnnonces = profils;
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
        Cours cours = (Cours) o;
        if (cours.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cours.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cours{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", duree=" + getDuree() +
            ", note=" + getNote() +
            ", prix=" + getPrix() +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
