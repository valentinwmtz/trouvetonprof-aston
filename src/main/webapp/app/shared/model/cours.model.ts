import { Moment } from 'moment';
import { IAnnonce } from 'app/shared/model/annonce.model';

export interface ICours {
    id?: number;
    date?: Moment;
    duree?: number;
    note?: number;
    prix?: number;
    commentaire?: string;
    annonce?: IAnnonce;
}

export class Cours implements ICours {
    constructor(
        public id?: number,
        public date?: Moment,
        public duree?: number,
        public note?: number,
        public prix?: number,
        public commentaire?: string,
        public annonce?: IAnnonce
    ) {}
}
