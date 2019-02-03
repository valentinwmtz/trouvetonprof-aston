import { IDomaine } from 'app/shared/model//domaine.model';

export interface IMatiere {
    id?: number;
    titre?: string;
    description?: string;
    domaine?: IDomaine;
}

export class Matiere implements IMatiere {
    constructor(public id?: number, public titre?: string, public description?: string, public domaine?: IDomaine) {}
}
