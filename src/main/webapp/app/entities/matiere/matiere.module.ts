import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrouvetonprofSharedModule } from 'app/shared';
import {
    MatiereComponent,
    MatiereDetailComponent,
    MatiereUpdateComponent,
    MatiereDeletePopupComponent,
    MatiereDeleteDialogComponent,
    matiereRoute,
    matierePopupRoute
} from './';
import { MatiereCardComponent } from 'app/entities/matiere/matiere-card/matiere-card.component';

const ENTITY_STATES = [...matiereRoute, ...matierePopupRoute];

@NgModule({
    imports: [TrouvetonprofSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MatiereComponent,
        MatiereDetailComponent,
        MatiereUpdateComponent,
        MatiereDeleteDialogComponent,
        MatiereDeletePopupComponent,
        MatiereCardComponent
    ],
    entryComponents: [MatiereComponent, MatiereUpdateComponent, MatiereDeleteDialogComponent, MatiereDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofMatiereModule {}
