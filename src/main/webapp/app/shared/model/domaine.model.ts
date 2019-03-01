import { IMatiere } from 'app/shared/model//matiere.model';
import { IAnnonce } from 'app/shared/model//annonce.model';

export interface IDomaine {
    id?: number;
    titre?: string;
    description?: string;
    imageContentType?: string;
    image?: any;
    matieres?: IMatiere[];
    annonces?: IAnnonce[];
}

export class Domaine implements IDomaine {
    constructor(
        public id?: number,
        public titre?: string,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public matieres?: IMatiere[],
        public annonces?: IAnnonce[]
    ) {}
}
