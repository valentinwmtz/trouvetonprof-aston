import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDomaine } from 'app/shared/model/domaine.model';
import { DomaineService } from './domaine.service';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { AnnonceService } from 'app/entities/annonce';

@Component({
    selector: 'jhi-domaine-update',
    templateUrl: './domaine-update.component.html'
})
export class DomaineUpdateComponent implements OnInit {
    domaine: IDomaine;
    isSaving: boolean;

    annonces: IAnnonce[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected domaineService: DomaineService,
        protected annonceService: AnnonceService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ domaine }) => {
            this.domaine = domaine;
        });
        this.annonceService.query().subscribe(
            (res: HttpResponse<IAnnonce[]>) => {
                this.annonces = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.domaine, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.domaine.id !== undefined) {
            this.subscribeToSaveResponse(this.domaineService.update(this.domaine));
        } else {
            this.subscribeToSaveResponse(this.domaineService.create(this.domaine));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDomaine>>) {
        result.subscribe((res: HttpResponse<IDomaine>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
