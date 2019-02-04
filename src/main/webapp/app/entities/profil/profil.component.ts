import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProfil } from 'app/shared/model/profil.model';
import { AccountService } from 'app/core';
import { ProfilService } from './profil.service';

@Component({
    selector: 'jhi-profil',
    templateUrl: './profil.component.html'
})
export class ProfilComponent implements OnInit, OnDestroy {
    profils: IProfil[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected profilService: ProfilService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.profilService
            .query()
            .pipe(
                filter((res: HttpResponse<IProfil[]>) => res.ok),
                map((res: HttpResponse<IProfil[]>) => res.body)
            )
            .subscribe(
                (res: IProfil[]) => {
                    this.profils = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProfils();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProfil) {
        return item.id;
    }

    registerChangeInProfils() {
        this.eventSubscriber = this.eventManager.subscribe('profilListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
