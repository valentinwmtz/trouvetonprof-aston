import { IProfil } from 'app/shared/model//profil.model';
import { IDomaine } from 'app/shared/model//domaine.model';
import { IDisponibilite } from 'app/shared/model//disponibilite.model';

export const enum Satut {
    PROFESSEUR = 'PROFESSEUR',
    ELEVE = 'ELEVE'
}

export interface IAnnonce {
    id?: number;
    titre?: string;
    description?: string;
    status?: Satut;
    profil?: IProfil;
    domaine?: IDomaine;
    annonceDisponibilites?: IDisponibilite[];
}

export class Annonce implements IAnnonce {
    constructor(
        public id?: number,
        public titre?: string,
        public description?: string,
        public status?: Satut,
        public profil?: IProfil,
        public domaine?: IDomaine,
        public annonceDisponibilites?: IDisponibilite[]
    ) {}
}
