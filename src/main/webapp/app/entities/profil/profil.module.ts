import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TrouvetonprofSharedModule } from 'app/shared';
import { TrouvetonprofAdminModule } from 'app/admin/admin.module';
import {
    ProfilComponent,
    ProfilDetailComponent,
    ProfilUpdateComponent,
    ProfilDeletePopupComponent,
    ProfilDeleteDialogComponent,
    profilRoute,
    profilPopupRoute
} from './';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';

const ENTITY_STATES = [...profilRoute, ...profilPopupRoute];

@NgModule({
    imports: [TrouvetonprofSharedModule, TrouvetonprofAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProfilComponent,
        ProfilDetailComponent,
        ProfilDeleteDialogComponent,
        ProfilDeletePopupComponent,
        ProfilUserComponent,
        ProfilAdminComponent
    ],
    entryComponents: [ProfilComponent, ProfilUpdateComponent, ProfilDeleteDialogComponent, ProfilDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrouvetonprofProfilModule {}
