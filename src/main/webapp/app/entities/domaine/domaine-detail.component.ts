import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDomaine } from 'app/shared/model/domaine.model';

@Component({
    selector: 'jhi-domaine-detail',
    templateUrl: './domaine-detail.component.html'
})
export class DomaineDetailComponent implements OnInit {
    domaine: IDomaine;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ domaine }) => {
            this.domaine = domaine;
        });
    }

    previousState() {
        window.history.back();
    }
}
