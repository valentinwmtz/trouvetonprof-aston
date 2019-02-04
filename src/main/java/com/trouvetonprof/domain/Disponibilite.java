package com.trouvetonprof.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Disponibilite.
 */
@Entity
@Table(name = "disponibilite")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Disponibilite implements Serializable {

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

    @ManyToOne
    @JsonIgnoreProperties("annonceDisponibilites")
    private Annonce annonce;

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

    public Disponibilite date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getDuree() {
        return duree;
    }

    public Disponibilite duree(Double duree) {
        this.duree = duree;
        return this;
    }

    public void setDuree(Double duree) {
        this.duree = duree;
    }

    public Annonce getAnnonce() {
        return annonce;
    }

    public Disponibilite annonce(Annonce annonce) {
        this.annonce = annonce;
        return this;
    }

    public void setAnnonce(Annonce annonce) {
        this.annonce = annonce;
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
        Disponibilite disponibilite = (Disponibilite) o;
        if (disponibilite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), disponibilite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Disponibilite{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", duree=" + getDuree() +
            "}";
    }
}
