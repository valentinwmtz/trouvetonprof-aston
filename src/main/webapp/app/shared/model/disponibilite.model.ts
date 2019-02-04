import { Moment } from 'moment';
import { IAnnonce } from 'app/shared/model/annonce.model';

export interface IDisponibilite {
    id?: number;
    date?: Moment;
    duree?: number;
    annonce?: IAnnonce;
}

export class Disponibilite implements IDisponibilite {
    constructor(public id?: number, public date?: Moment, public duree?: number, public annonce?: IAnnonce) {}
}
