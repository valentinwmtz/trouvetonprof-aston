import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JhiAlertService, JhiDataUtils} from 'ng-jhipster';

import {IAnnonce} from 'app/shared/model/annonce.model';
import {DisponibiliteService} from 'app/entities/disponibilite';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IDisponibilite} from 'app/shared/model/disponibilite.model';

@Component({
    selector: 'jhi-annonce-detail',
    templateUrl: './annonce-detail.component.html',
    styleUrls: ['./annonce-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnonceDetailComponent implements OnInit {
    annonce: IAnnonce;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute,
                protected jhiAlertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({annonce}) => {
            this.annonce = annonce;
        });
        console.log('helloword');
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

}
