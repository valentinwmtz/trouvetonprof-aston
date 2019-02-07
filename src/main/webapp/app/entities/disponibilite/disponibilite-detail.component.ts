import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisponibilite } from 'app/shared/model/disponibilite.model';

@Component({
    selector: 'jhi-disponibilite-detail',
    templateUrl: './disponibilite-detail.component.html'
})
export class DisponibiliteDetailComponent implements OnInit {
    disponibilite: IDisponibilite;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ disponibilite }) => {
            this.disponibilite = disponibilite;
        });
    }

    previousState() {
        window.history.back();
    }
}
