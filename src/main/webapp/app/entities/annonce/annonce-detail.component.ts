import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IAnnonce } from 'app/shared/model/annonce.model';

@Component({
    selector: 'jhi-annonce-detail',
    templateUrl: './annonce-detail.component.html'
})
export class AnnonceDetailComponent implements OnInit {
    annonce: IAnnonce;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ annonce }) => {
            this.annonce = annonce;
        });
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
}
