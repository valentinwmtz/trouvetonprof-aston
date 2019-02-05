import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import { DisponibiliteService } from './disponibilite.service';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { AnnonceService } from 'app/entities/annonce';

@Component({
    selector: 'jhi-disponibilite-update',
    templateUrl: './disponibilite-update.component.html'
})
export class DisponibiliteUpdateComponent implements OnInit {
    disponibilite: IDisponibilite;
    isSaving: boolean;

    annonces: IAnnonce[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected disponibiliteService: DisponibiliteService,
        protected annonceService: AnnonceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ disponibilite }) => {
            this.disponibilite = disponibilite;
            this.date = this.disponibilite.date != null ? this.disponibilite.date.format(DATE_TIME_FORMAT) : null;
        });
        this.annonceService.query().subscribe(
            (res: HttpResponse<IAnnonce[]>) => {
                this.annonces = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.disponibilite.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.disponibilite.id !== undefined) {
            this.subscribeToSaveResponse(this.disponibiliteService.update(this.disponibilite));
        } else {
            this.subscribeToSaveResponse(this.disponibiliteService.create(this.disponibilite));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisponibilite>>) {
        result.subscribe((res: HttpResponse<IDisponibilite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAnnonceById(index: number, item: IAnnonce) {
        return item.id;
    }
}
