import { Moment } from 'moment';
import { IProfil } from 'app/shared/model/profil.model';

export interface IMessage {
    id?: number;
    utilisateur1?: string;
    utilisateur2?: string;
    texte?: string;
    date?: Moment;
    profil?: IProfil;
}

export class Message implements IMessage {
    constructor(
        public id?: number,
        public utilisateur1?: string,
        public utilisateur2?: string,
        public texte?: string,
        public date?: Moment,
        public profil?: IProfil
    ) {}
}
