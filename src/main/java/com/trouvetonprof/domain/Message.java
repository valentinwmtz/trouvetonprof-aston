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
 * A Message.
 */
@Entity
@Table(name = "message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 100)
    @Column(name = "utilisateur_1", length = 100)
    private String utilisateur1;

    @Size(max = 100)
    @Column(name = "utilisateur_2", length = 100)
    private String utilisateur2;

    @NotNull
    @Size(max = 3000)
    @Column(name = "texte", length = 3000, nullable = false)
    private String texte;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("userMessages")
    private Profil profil;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUtilisateur1() {
        return utilisateur1;
    }

    public Message utilisateur1(String utilisateur1) {
        this.utilisateur1 = utilisateur1;
        return this;
    }

    public void setUtilisateur1(String utilisateur1) {
        this.utilisateur1 = utilisateur1;
    }

    public String getUtilisateur2() {
        return utilisateur2;
    }

    public Message utilisateur2(String utilisateur2) {
        this.utilisateur2 = utilisateur2;
        return this;
    }

    public void setUtilisateur2(String utilisateur2) {
        this.utilisateur2 = utilisateur2;
    }

    public String getTexte() {
        return texte;
    }

    public Message texte(String texte) {
        this.texte = texte;
        return this;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }

    public Instant getDate() {
        return date;
    }

    public Message date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Profil getProfil() {
        return profil;
    }

    public Message profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
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
        Message message = (Message) o;
        if (message.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), message.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", utilisateur1='" + getUtilisateur1() + "'" +
            ", utilisateur2='" + getUtilisateur2() + "'" +
            ", texte='" + getTexte() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
