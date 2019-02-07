import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrouvetonprofSharedModule } from 'app/shared';
import {
    AnnonceComponent,
    AnnonceDetailComponent,
    AnnonceUpdateComponent,
    AnnonceDeletePopupComponent,
    AnnonceDeleteDialogComponent,
    annonceRoute,
    annoncePopupRoute
} from './';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { CalendrierHeaderComponent } from './calendrier/calendrier-header/calendrier-header.component';

const ENTITY_STATES = [...annonceRoute, ...annoncePopupRoute];

@NgModule({
    imports: [TrouvetonprofSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnnonceComponent,
        AnnonceDetailComponent,
        AnnonceUpdateComponent,
        AnnonceDeleteDialogComponent,
        AnnonceDeletePopupComponent,
        CalendrierComponent,
        CalendrierHeaderComponent
    ],
    entryComponents: [AnnonceComponent, AnnonceUpdateComponent, AnnonceDeleteDialogComponent, AnnonceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofAnnonceModule {}
