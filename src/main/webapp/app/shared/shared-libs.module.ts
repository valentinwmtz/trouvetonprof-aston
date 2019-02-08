import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgJhipsterModule } from 'ng-jhipster';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JhMaterialModule } from 'app/shared/material/jh-material.module';
import { MomentModule } from 'angular2-moment';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MglTimelineModule } from 'angular-mgl-timeline';

class CustomDateFormatter extends CalendarNativeDateFormatter {
    public dayViewHour({ date, locale }: DateFormatterParams): string {
        return new Intl.DateTimeFormat('fr', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);
    }
}

@NgModule({
    imports: [
        NgbModule.forRoot(),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        FontAwesomeModule,
        JhMaterialModule,
        MomentModule,
        MglTimelineModule,
        CalendarModule.forRoot(
            {
                provide: DateAdapter,
                useFactory: adapterFactory
            },
            {
                dateFormatter: {
                    provide: CalendarDateFormatter,
                    useClass: CustomDateFormatter
                }
            }
        )
    ],
    exports: [
        FormsModule,
        CommonModule,
        NgbModule,
        NgJhipsterModule,
        InfiniteScrollModule,
        FontAwesomeModule,
        JhMaterialModule,
        MomentModule,
        CalendarModule,
        MglTimelineModule
    ]
})
export class TrouvetonprofSharedLibsModule {
    static forRoot() {
        return {
            ngModule: TrouvetonprofSharedLibsModule
        };
    }
}
