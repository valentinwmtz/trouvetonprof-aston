import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { AnnonceService } from './annonce.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil';
import { IDomaine } from 'app/shared/model/domaine.model';
import { DomaineService } from 'app/entities/domaine';

@Component({
    selector: 'jhi-annonce-update',
    templateUrl: './annonce-update.component.html'
})
export class AnnonceUpdateComponent implements OnInit {
    annonce: IAnnonce;
    isSaving: boolean;

    profils: IProfil[];

    domaines: IDomaine[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected annonceService: AnnonceService,
        protected profilService: ProfilService,
        protected domaineService: DomaineService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ annonce }) => {
            this.annonce = annonce;
        });
        this.profilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfil[]>) => response.body)
            )
            .subscribe((res: IProfil[]) => (this.profils = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.domaineService
            .query({ filter: 'annonce-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDomaine[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDomaine[]>) => response.body)
            )
            .subscribe(
                (res: IDomaine[]) => {
                    if (!this.annonce.domaine || !this.annonce.domaine.id) {
                        this.domaines = res;
                    } else {
                        this.domaineService
                            .find(this.annonce.domaine.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDomaine>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDomaine>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDomaine) => (this.domaines = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
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
        this.dataUtils.clearInputImage(this.annonce, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.annonce.id !== undefined) {
            this.subscribeToSaveResponse(this.annonceService.update(this.annonce));
        } else {
            this.subscribeToSaveResponse(this.annonceService.create(this.annonce));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnonce>>) {
        result.subscribe((res: HttpResponse<IAnnonce>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProfilById(index: number, item: IProfil) {
        return item.id;
    }

    trackDomaineById(index: number, item: IDomaine) {
        return item.id;
    }
}
