import { Component, Input, OnInit } from '@angular/core';
import { IProfil } from 'app/shared/model/profil.model';

@Component({
    selector: 'jhi-profil-user',
    templateUrl: './profil-user.component.html',
    styles: []
})
export class ProfilUserComponent implements OnInit {
    @Input() profils: IProfil[];
    constructor() {}

    ngOnInit() {}
}
