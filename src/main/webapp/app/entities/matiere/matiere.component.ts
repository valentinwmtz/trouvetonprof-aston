import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IMatiere } from 'app/shared/model/matiere.model';
import { AccountService } from 'app/core';
import { MatiereService } from './matiere.service';
import { AnnonceService } from 'app/entities/annonce';
import { IAnnonce } from 'app/shared/model/annonce.model';

@Component({
    selector: 'jhi-matiere',
    templateUrl: './matiere.component.html',
    styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit, OnDestroy {
    matieres: IMatiere[];
    annonces: IAnnonce[];
    currentAccount: any;
    eventSubscriber: Subscription;

    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
    constructor(
        protected matiereService: MatiereService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected annonceService: AnnonceService
    ) {}

    loadAll() {
        this.matiereService.query().subscribe(
            (res: HttpResponse<IMatiere[]>) => {
                this.matieres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.annonceService.findAllByMatiereId(1).subscribe(reponse => {
            console.error(reponse.body);
        });
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMatieres();
        this.annonceService.query().subscribe(
            (res: HttpResponse<IAnnonce[]>) => {
                this.annonces = res.body;
                console.log(this.annonces);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
