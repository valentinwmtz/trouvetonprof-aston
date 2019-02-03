import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMatiere } from 'app/shared/model/matiere.model';
import { MatiereService } from './matiere.service';
import { IDomaine } from 'app/shared/model/domaine.model';
import { DomaineService } from 'app/entities/domaine';

@Component({
    selector: 'jhi-matiere-update',
    templateUrl: './matiere-update.component.html'
})
export class MatiereUpdateComponent implements OnInit {
    matiere: IMatiere;
    isSaving: boolean;

    domaines: IDomaine[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected matiereService: MatiereService,
        protected domaineService: DomaineService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ matiere }) => {
            this.matiere = matiere;
        });
        this.domaineService.query().subscribe(
            (res: HttpResponse<IDomaine[]>) => {
                this.domaines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.matiere.id !== undefined) {
            this.subscribeToSaveResponse(this.matiereService.update(this.matiere));
        } else {
            this.subscribeToSaveResponse(this.matiereService.create(this.matiere));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMatiere>>) {
        result.subscribe((res: HttpResponse<IMatiere>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDomaineById(index: number, item: IDomaine) {
        return item.id;
    }
}
