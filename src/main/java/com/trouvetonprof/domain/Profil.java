package com.trouvetonprof.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.trouvetonprof.domain.enumeration.Sexe;

/**
 * A Profil.
 */
@Entity
@Table(name = "profil")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Profil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_naissance", nullable = false)
    private Instant dateNaissance;

    @Column(name = "pays")
    private String pays;

    @Size(max = 200)
    @Column(name = "adresse", length = 200)
    private String adresse;

    @Size(max = 20)
    @Column(name = "telephone", length = 20)
    private String telephone;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sexe", nullable = false)
    private Sexe sexe;

    @OneToOne    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "profil")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Message> userMessages = new HashSet<>();
    @OneToMany(mappedBy = "profil")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Annonce> userAnnonces = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateNaissance() {
        return dateNaissance;
    }

    public Profil dateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
        return this;
    }

    public void setDateNaissance(Instant dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getPays() {
        return pays;
    }

    public Profil pays(String pays) {
        this.pays = pays;
        return this;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getAdresse() {
        return adresse;
    }

    public Profil adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public Profil telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public Profil sexe(Sexe sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public User getUser() {
        return user;
    }

    public Profil user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Message> getUserMessages() {
        return userMessages;
    }

    public Profil userMessages(Set<Message> messages) {
        this.userMessages = messages;
        return this;
    }

    public Profil addUserMessage(Message message) {
        this.userMessages.add(message);
        message.setProfil(this);
        return this;
    }

    public Profil removeUserMessage(Message message) {
        this.userMessages.remove(message);
        message.setProfil(null);
        return this;
    }

    public void setUserMessages(Set<Message> messages) {
        this.userMessages = messages;
    }

    public Set<Annonce> getUserAnnonces() {
        return userAnnonces;
    }

    public Profil userAnnonces(Set<Annonce> annonces) {
        this.userAnnonces = annonces;
        return this;
    }

    public Profil addUserAnnonce(Annonce annonce) {
        this.userAnnonces.add(annonce);
        annonce.setProfil(this);
        return this;
    }

    public Profil removeUserAnnonce(Annonce annonce) {
        this.userAnnonces.remove(annonce);
        annonce.setProfil(null);
        return this;
    }

    public void setUserAnnonces(Set<Annonce> annonces) {
        this.userAnnonces = annonces;
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
        Profil profil = (Profil) o;
        if (profil.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), profil.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Profil{" +
            "id=" + getId() +
            ", dateNaissance='" + getDateNaissance() + "'" +
            ", pays='" + getPays() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", sexe='" + getSexe() + "'" +
            "}";
    }
}
