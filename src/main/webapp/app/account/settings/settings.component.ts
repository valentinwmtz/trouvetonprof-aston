import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { AccountService, JhiLanguageHelper } from 'app/core';
import { ProfilService } from 'app/entities/profil';
import { IProfil } from 'app/shared/model/profil.model';
import { IUser, UserService } from 'app/core';
import { ICours } from 'app/shared/model/cours.model';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'app/entities/cours';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    profil: IProfil;
    isSaving: boolean;

    users: IUser[];
    cours: ICours[];
    dateNaissance: string;

    constructor(
        private accountService: AccountService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private jhiAlertService: JhiAlertService,
        private profilService: ProfilService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private coursService: CoursService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
        this.isSaving = false;
        this.findOne();
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

    // loadAll() {
    //     this.profilService.query().subscribe(
    //         (res: HttpResponse<IProfil[]>) => {
    //             this.profil = res.body[0];
    //         },
    //         (res: HttpErrorResponse) => this.onError(res.message)
    //     );
    // }
    findOne() {
        this.profilService.findProfil().subscribe((res: HttpResponse<IProfil>) => {
            this.profil = res.body;
            console.log(this.profil);
        });
    }
    save() {
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                this.error = null;
                this.success = 'OK';
                this.accountService.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                });
                this.languageService.getCurrent().then(current => {
                    if (this.settingsAccount.langKey !== current) {
                        this.languageService.changeLanguage(this.settingsAccount.langKey);
                    }
                });
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );
    }

    previousState() {
        window.history.back();
    }

    update() {
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

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
