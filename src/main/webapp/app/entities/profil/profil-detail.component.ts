import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfil } from 'app/shared/model/profil.model';

@Component({
    selector: 'jhi-profil-detail',
    templateUrl: './profil-detail.component.html'
})
export class ProfilDetailComponent implements OnInit {
    profil: IProfil;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ profil }) => {
            this.profil = profil;
            console.error(this.profil);
        });
    }

    previousState() {
        window.history.back();
    }
}
