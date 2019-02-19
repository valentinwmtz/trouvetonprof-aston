import { Component, Input, OnInit } from '@angular/core';
import { IProfil } from 'app/shared/model/profil.model';

@Component({
    selector: 'jhi-profil-admin',
    templateUrl: './profil-admin.component.html',
    styles: []
})
export class ProfilAdminComponent implements OnInit {
    @Input() profils: IProfil[];

    constructor() {}

    ngOnInit() {}
}
