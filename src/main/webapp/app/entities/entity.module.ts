import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TrouvetonprofProfilModule } from './profil/profil.module';
import { TrouvetonprofAnnonceModule } from './annonce/annonce.module';
import { TrouvetonprofDisponibiliteModule } from './disponibilite/disponibilite.module';
import { TrouvetonprofDomaineModule } from './domaine/domaine.module';
import { TrouvetonprofMatiereModule } from './matiere/matiere.module';
import { TrouvetonprofMessageModule } from './message/message.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TrouvetonprofProfilModule,
        TrouvetonprofAnnonceModule,
        TrouvetonprofDisponibiliteModule,
        TrouvetonprofDomaineModule,
        TrouvetonprofMatiereModule,
        TrouvetonprofMessageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofEntityModule {}
