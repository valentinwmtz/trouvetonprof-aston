import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarEvent, DAYS_OF_WEEK} from 'angular-calendar';
import {IAnnonce} from 'app/shared/model/annonce.model';
import {Observable, Subject} from 'rxjs';
import {IDisponibilite} from 'app/shared/model/disponibilite.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {DisponibiliteService} from 'app/entities/disponibilite';
import {JhiAlertService} from 'ng-jhipster';

@Component({
    selector: 'jhi-calendrier',
    templateUrl: './calendrier.component.html',
    styleUrls: ['./calendrier.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class CalendrierComponent implements OnInit {

    @Input() annonce: IAnnonce;
    disponibilite: IDisponibilite[];

    view = 'week';

    viewDate: Date = new Date();

    events: CalendarEvent[] = [];
    locale = 'fr';

    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

    refresh: Subject<any> = new Subject();

    constructor(private disponibiliteService: DisponibiliteService, protected jhiAlertService: JhiAlertService) {
    }

    ngOnInit() {
        this.disponibiliteService.findByAnnonceId(this.annonce.id).subscribe(
            (res: HttpResponse<IDisponibilite[]>) => {
                this.disponibilite = res.body;
                console.log(this.disponibilite);
                this.disponibilite.forEach(dispo => {
                    console.log(new Date());
                    console.log(dispo.date.format());
                    this.events.push({
                        title: 'DISPONIBLE',
                        start: new Date(dispo.date.format()),
                        end: new Date(dispo.date.add(dispo.duree, 'h').format()),
                        color: {
                            primary: '#ffffff',
                            secondary: '#2e7d32'
                        },
                        cssClass: 'case-calendrier-disponible',
                        draggable: true,
                        resizable: {
                            beforeStart: true,
                            afterEnd: true
                        }
                    });
                });
                console.log(this.events);
                this.refresh.next();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        console.log(this.annonce);
        console.log(this.disponibilite);
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    refreshView(): void {
        this.refresh.next();
    }

}
