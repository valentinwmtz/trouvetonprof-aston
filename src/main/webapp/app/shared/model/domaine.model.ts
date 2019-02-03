import { IMatiere } from 'app/shared/model//matiere.model';
import { IAnnonce } from 'app/shared/model//annonce.model';

export interface IDomaine {
    id?: number;
    titre?: string;
    description?: string;
    matieres?: IMatiere[];
    annonce?: IAnnonce;
}

export class Domaine implements IDomaine {
    constructor(
        public id?: number,
        public titre?: string,
        public description?: string,
        public matieres?: IMatiere[],
        public annonce?: IAnnonce
    ) {}
}
