import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from './cours.service';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { AnnonceService } from 'app/entities/annonce';

@Component({
    selector: 'jhi-cours-update',
    templateUrl: './cours-update.component.html'
})
export class CoursUpdateComponent implements OnInit {
    cours: ICours;
    isSaving: boolean;

    annonces: IAnnonce[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected coursService: CoursService,
        protected annonceService: AnnonceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cours }) => {
            this.cours = cours;
            this.date = this.cours.date != null ? this.cours.date.format(DATE_TIME_FORMAT) : null;
        });
        this.annonceService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAnnonce[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAnnonce[]>) => response.body)
            )
            .subscribe((res: IAnnonce[]) => (this.annonces = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.cours.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.cours.id !== undefined) {
            this.subscribeToSaveResponse(this.coursService.update(this.cours));
        } else {
            this.subscribeToSaveResponse(this.coursService.create(this.cours));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICours>>) {
        result.subscribe((res: HttpResponse<ICours>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
