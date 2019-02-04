import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMatiere } from 'app/shared/model/matiere.model';

@Component({
    selector: 'jhi-matiere-detail',
    templateUrl: './matiere-detail.component.html'
})
export class MatiereDetailComponent implements OnInit {
    matiere: IMatiere;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ matiere }) => {
            this.matiere = matiere;
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
