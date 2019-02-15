import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TrouvetonprofSharedModule } from 'app/shared';
import {
    DisponibiliteComponent,
    DisponibiliteDetailComponent,
    DisponibiliteUpdateComponent,
    DisponibiliteDeletePopupComponent,
    DisponibiliteDeleteDialogComponent,
    disponibiliteRoute,
    disponibilitePopupRoute
} from './';

const ENTITY_STATES = [...disponibiliteRoute, ...disponibilitePopupRoute];

@NgModule({
    imports: [TrouvetonprofSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DisponibiliteComponent,
        DisponibiliteDetailComponent,
        DisponibiliteUpdateComponent,
        DisponibiliteDeleteDialogComponent,
        DisponibiliteDeletePopupComponent
    ],
    entryComponents: [
        DisponibiliteComponent,
        DisponibiliteUpdateComponent,
        DisponibiliteDeleteDialogComponent,
        DisponibiliteDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofDisponibiliteModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
