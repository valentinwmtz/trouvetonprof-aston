import { IProfil } from 'app/shared/model//profil.model';
import { IDisponibilite } from 'app/shared/model//disponibilite.model';
import { ICours } from 'app/shared/model//cours.model';
import { IDomaine } from 'app/shared/model//domaine.model';

export const enum Satut {
    PROFESSEUR = 'PROFESSEUR',
    ELEVE = 'ELEVE'
}

export interface IAnnonce {
    id?: number;
    titre?: string;
    description?: string;
    status?: Satut;
    imageContentType?: string;
    image?: any;
    adminValide?: boolean;
    prixHoraire?: number;
    profil?: IProfil;
    annonceDisponibilites?: IDisponibilite[];
    annonceCours?: ICours[];
    domaine?: IDomaine;
}

export class Annonce implements IAnnonce {
    constructor(
        public id?: number,
        public titre?: string,
        public description?: string,
        public status?: Satut,
        public imageContentType?: string,
        public image?: any,
        public adminValide?: boolean,
        public prixHoraire?: number,
        public profil?: IProfil,
        public annonceDisponibilites?: IDisponibilite[],
        public annonceCours?: ICours[],
        public domaine?: IDomaine
    ) {
        this.adminValide = this.adminValide || false;
    }
}
