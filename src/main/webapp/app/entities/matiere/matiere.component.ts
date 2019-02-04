import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IMatiere } from 'app/shared/model/matiere.model';
import { AccountService } from 'app/core';
import { MatiereService } from './matiere.service';

@Component({
    selector: 'jhi-matiere',
    templateUrl: './matiere.component.html'
})
export class MatiereComponent implements OnInit, OnDestroy {
    matieres: IMatiere[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected matiereService: MatiereService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.matiereService
            .query()
            .pipe(
                filter((res: HttpResponse<IMatiere[]>) => res.ok),
                map((res: HttpResponse<IMatiere[]>) => res.body)
            )
            .subscribe(
                (res: IMatiere[]) => {
                    this.matieres = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMatieres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMatiere) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInMatieres() {
        this.eventSubscriber = this.eventManager.subscribe('matiereListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
