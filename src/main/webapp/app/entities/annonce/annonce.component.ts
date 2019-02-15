import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAnnonce } from 'app/shared/model/annonce.model';
import { AccountService } from 'app/core';
import { AnnonceService } from './annonce.service';

@Component({
    selector: 'jhi-annonce',
    templateUrl: './annonce.component.html'
})
export class AnnonceComponent implements OnInit, OnDestroy {
    annonces: IAnnonce[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected annonceService: AnnonceService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.annonceService
            .query()
            .pipe(
                filter((res: HttpResponse<IAnnonce[]>) => res.ok),
                map((res: HttpResponse<IAnnonce[]>) => res.body)
            )
            .subscribe(
                (res: IAnnonce[]) => {
                    this.annonces = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAnnonces();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAnnonce) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInAnnonces() {
        this.eventSubscriber = this.eventManager.subscribe('annonceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
