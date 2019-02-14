import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDomaine } from 'app/shared/model/domaine.model';
import { AccountService } from 'app/core';
import { DomaineService } from './domaine.service';
import { MatiereService } from 'app/entities/matiere';
import { IMatiere } from 'app/shared/model/matiere.model';

@Component({
    selector: 'jhi-domaine',
    templateUrl: './domaine.component.html',
    styleUrls: ['./domaine.component.css']
})
export class DomaineComponent implements OnInit, OnDestroy {
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
    domaines: IDomaine[];
    matieres: IMatiere[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected domaineService: DomaineService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected matiereService: MatiereService,
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
        this.matiereService.query().subscribe(
            (res: HttpResponse<IMatiere[]>) => {
                this.matieres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
