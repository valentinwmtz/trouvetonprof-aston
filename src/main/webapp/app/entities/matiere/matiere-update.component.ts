import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
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
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected matiereService: MatiereService,
        protected domaineService: DomaineService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ matiere }) => {
            this.matiere = matiere;
        });
        this.domaineService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDomaine[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDomaine[]>) => response.body)
            )
            .subscribe((res: IDomaine[]) => (this.domaines = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.dataUtils.clearInputImage(this.matiere, this.elementRef, field, fieldContentType, idInput);
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
