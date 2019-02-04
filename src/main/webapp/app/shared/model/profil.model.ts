import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IMessage } from 'app/shared/model/message.model';
import { IAnnonce } from 'app/shared/model/annonce.model';

export const enum Sexe {
    HOMME = 'HOMME',
    FEMME = 'FEMME'
}

export interface IProfil {
    id?: number;
    dateNaissance?: Moment;
    pays?: string;
    adresse?: string;
    telephone?: string;
    sexe?: Sexe;
    user?: IUser;
    userMessages?: IMessage[];
    userAnnonces?: IAnnonce[];
}

export class Profil implements IProfil {
    constructor(
        public id?: number,
        public dateNaissance?: Moment,
        public pays?: string,
        public adresse?: string,
        public telephone?: string,
        public sexe?: Sexe,
        public user?: IUser,
        public userMessages?: IMessage[],
        public userAnnonces?: IAnnonce[]
    ) {}
}
