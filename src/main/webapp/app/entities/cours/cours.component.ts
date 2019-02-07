import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICours } from 'app/shared/model/cours.model';
import { AccountService } from 'app/core';
import { CoursService } from './cours.service';

@Component({
    selector: 'jhi-cours',
    templateUrl: './cours.component.html'
})
export class CoursComponent implements OnInit, OnDestroy {
    cours: ICours[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected coursService: CoursService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.coursService.query().subscribe(
            (res: HttpResponse<ICours[]>) => {
                this.cours = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCours();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICours) {
        return item.id;
    }

    registerChangeInCours() {
        this.eventSubscriber = this.eventManager.subscribe('coursListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
