import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

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
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.domaineService
            .query()
            .pipe(
                filter((res: HttpResponse<IDomaine[]>) => res.ok),
                map((res: HttpResponse<IDomaine[]>) => res.body)
            )
            .subscribe(
                (res: IDomaine[]) => {
                    this.domaines = res;
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

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInDomaines() {
        this.eventSubscriber = this.eventManager.subscribe('domaineListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
