import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import { AccountService } from 'app/core';
import { DisponibiliteService } from './disponibilite.service';

@Component({
    selector: 'jhi-disponibilite',
    templateUrl: './disponibilite.component.html'
})
export class DisponibiliteComponent implements OnInit, OnDestroy {
    disponibilites: IDisponibilite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected disponibiliteService: DisponibiliteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.disponibiliteService
            .query()
            .pipe(
                filter((res: HttpResponse<IDisponibilite[]>) => res.ok),
                map((res: HttpResponse<IDisponibilite[]>) => res.body)
            )
            .subscribe(
                (res: IDisponibilite[]) => {
                    this.disponibilites = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDisponibilites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDisponibilite) {
        return item.id;
    }

    registerChangeInDisponibilites() {
        this.eventSubscriber = this.eventManager.subscribe('disponibiliteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
