import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ChangeDetectorRef } from '@angular/core';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { DisponibiliteService } from 'app/entities/disponibilite';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import * as moment from 'moment';

@Component({
    selector: 'jhi-annonce-detail',
    templateUrl: './annonce-detail.component.html',
    styleUrls: ['./annonce-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnonceDetailComponent implements OnInit {
    annonce: IAnnonce;
    disponibilites = [];
    // timeline var
    alternate = true;
    toggle = true;
    color = false;
    size = 40;
    expandEnabled = true;
    side = 'right';
    isDisponibilitesloaded = false;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected activatedRoute: ActivatedRoute,
        protected jhiAlertService: JhiAlertService,
        private disponibiliteService: DisponibiliteService,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ annonce }) => {
            this.annonce = annonce;
        });

        this.disponibiliteService.findByAnnonceId(this.annonce.id).subscribe(
            (res: HttpResponse<IDisponibilite[]>) => {
                const dispoStructured = this.stuctureDispoForTimeLine(res.body);
                console.error(dispoStructured);
                dispoStructured.forEach(dispo => {
                    this.disponibilites.push({
                        header: this.capitalizeAllFirstCharOfWord(dispo.header),
                        content: dispo.content
                    });
                });
                this.isDisponibilitesloaded = true;
                this.changeDetectorRef.detectChanges();
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private stuctureDispoForTimeLine(disponibilites: IDisponibilite[]): Array<any> {
        const disponibilitesStructured = [];
        disponibilites.forEach(dispo => {
            if (!dispo.date.isBefore(Date.now())) {
                const dateHeader = dispo.date.locale('fr').format('dddd MM MMMM YYYY');
                const dateContent = `De ${dispo.date.locale('fr').format('kk')}H${dispo.date.locale('fr').format('mm')}
                         à ${dispo.date
                             .add(dispo.duree, 'h')
                             .locale('fr')
                             .format('kk')}H${dispo.date.locale('fr').format('mm')}`;
                if (disponibilitesStructured.length === 0 || !disponibilitesStructured.some(dispoSome => dispoSome.header === dateHeader)) {
                    disponibilitesStructured.push({
                        header: dateHeader,
                        content: [dateContent]
                    });
                } else {
                    disponibilitesStructured[
                        disponibilitesStructured.findIndex(dispoIndex => dispoIndex.header === dateHeader)
                    ].content.push(dateContent);
                }
            }
        });
        return disponibilitesStructured;
    }

    private capitalizeAllFirstCharOfWord(string: String) {
        return string.replace(/(?:^|\s)\S/g, a => {
            return a.toUpperCase();
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    onHeaderClick(event) {
        if (!this.expandEnabled) {
            event.stopPropagation();
        }
    }

    onDotClick(event) {
        if (!this.expandEnabled) {
            event.stopPropagation();
        }
    }

    onExpandEntry(expanded, index) {
        console.log(`Expand status of entry #${index} changed to ${expanded}`);
    }
}
