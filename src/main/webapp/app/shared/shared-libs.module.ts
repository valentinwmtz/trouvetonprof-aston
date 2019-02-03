import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JhMaterialModule } from 'app/shared/material/jh-material.module';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        FontAwesomeModule,
        BrowserAnimationsModule,
        JhMaterialModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        JhMaterialModule
    ]
})
export class TrouvetonprofSharedLibsModule {
    static forRoot() {
        return {
            ngModule: TrouvetonprofSharedLibsModule
        };
    }
}
