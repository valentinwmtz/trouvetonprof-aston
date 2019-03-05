import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';
import { IUser, UserService } from 'app/core';
import { ICours } from 'app/shared/model/cours.model';
import { CoursService } from 'app/entities/cours';

@Component({
    selector: 'jhi-profil-update',
    templateUrl: './profil-update.component.html'
})
export class ProfilUpdateComponent implements OnInit {
    @Input() profil: IProfil;
    isSaving: boolean;

    users: IUser[];

    cours: ICours[];
    dateNaissance: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected profilService: ProfilService,
        protected userService: UserService,
        protected coursService: CoursService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        // this.activatedRoute.data.subscribe(({ profil }) => {
        //     this.profil = profil;
        //     this.dateNaissance = this.profil.dateNaissance != null ? this.profil.dateNaissance.format(DATE_TIME_FORMAT) : null;
        // });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.coursService.query().subscribe(
            (res: HttpResponse<ICours[]>) => {
                this.cours = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        console.log(this.profil.id);
        this.isSaving = true;
        this.profil.dateNaissance = this.dateNaissance != null ? moment(this.dateNaissance, DATE_TIME_FORMAT) : null;
        if (this.profil.id !== undefined) {
            this.subscribeToSaveResponse(this.profilService.update(this.profil));
        } else {
            this.subscribeToSaveResponse(this.profilService.create(this.profil));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfil>>) {
        result.subscribe((res: HttpResponse<IProfil>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackCoursById(index: number, item: ICours) {
        return item.id;
    }
}
