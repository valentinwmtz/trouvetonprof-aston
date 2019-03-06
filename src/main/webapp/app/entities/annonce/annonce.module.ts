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
import { ReservationComponent } from './reservation/reservation.component';
import { AnnonceListComponent } from './annonce-list/annonce-list.component';
import { AnnonceFilterPipe } from './annonce-list/annonce-filter.pipe';
import { AnnonceLocFilterPipe } from './annonce-list/annonce-loc-filter.pipe';

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
        CalendrierHeaderComponent,
        ReservationComponent,
        AnnonceListComponent,
        AnnonceFilterPipe,
        AnnonceLocFilterPipe
    ],
    entryComponents: [
        AnnonceComponent,
        AnnonceUpdateComponent,
        AnnonceDeleteDialogComponent,
        AnnonceDeletePopupComponent,
        ReservationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofAnnonceModule {}
