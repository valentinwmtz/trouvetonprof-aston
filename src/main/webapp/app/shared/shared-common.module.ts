import { NgModule } from '@angular/core';

import { TrouvetonprofSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent } from './';
import { ProfilUpdateComponent } from 'app/entities/profil';

@NgModule({
    imports: [TrouvetonprofSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, ProfilUpdateComponent],
    exports: [TrouvetonprofSharedLibsModule, FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, ProfilUpdateComponent]
})
export class TrouvetonprofSharedCommonModule {}
