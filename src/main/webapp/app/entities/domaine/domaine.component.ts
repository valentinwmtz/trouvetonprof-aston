import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDomaine } from 'app/shared/model/domaine.model';
import { AccountService } from 'app/core';
import { DomaineService } from './domaine.service';

@Component({
    selector: 'jhi-domaine',
    templateUrl: './domaine.component.html'
})
export class DomaineComponent implements OnInit, OnDestroy {
    domaines: IDomaine[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected domaineService: DomaineService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.domaineService.query().subscribe(
            (res: HttpResponse<IDomaine[]>) => {
                this.domaines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDomaines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDomaine) {
        return item.id;
    }

    registerChangeInDomaines() {
        this.eventSubscriber = this.eventManager.subscribe('domaineListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
