import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TrouvetonprofSharedModule } from 'app/shared';
import {
    DomaineComponent,
    DomaineDetailComponent,
    DomaineUpdateComponent,
    DomaineDeletePopupComponent,
    DomaineDeleteDialogComponent,
    domaineRoute,
    domainePopupRoute
} from './';

const ENTITY_STATES = [...domaineRoute, ...domainePopupRoute];

@NgModule({
    imports: [TrouvetonprofSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DomaineComponent,
        DomaineDetailComponent,
        DomaineUpdateComponent,
        DomaineDeleteDialogComponent,
        DomaineDeletePopupComponent
    ],
    entryComponents: [DomaineComponent, DomaineUpdateComponent, DomaineDeleteDialogComponent, DomaineDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofDomaineModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
