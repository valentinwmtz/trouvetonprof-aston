import { Moment } from 'moment';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { IProfil } from 'app/shared/model/profil.model';

export interface ICours {
    id?: number;
    date?: Moment;
    duree?: number;
    note?: number;
    prix?: number;
    commentaire?: string;
    annonce?: IAnnonce;
    coursAnnonces?: IProfil[];
}

export class Cours implements ICours {
    constructor(
        public id?: number,
        public date?: Moment,
        public duree?: number,
        public note?: number,
        public prix?: number,
        public commentaire?: string,
        public annonce?: IAnnonce,
        public coursAnnonces?: IProfil[]
    ) {}
}
