import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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

const ENTITY_STATES = [...annonceRoute, ...annoncePopupRoute];

@NgModule({
    imports: [TrouvetonprofSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnnonceComponent,
        AnnonceDetailComponent,
        AnnonceUpdateComponent,
        AnnonceDeleteDialogComponent,
        AnnonceDeletePopupComponent
    ],
    entryComponents: [AnnonceComponent, AnnonceUpdateComponent, AnnonceDeleteDialogComponent, AnnonceDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofAnnonceModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
