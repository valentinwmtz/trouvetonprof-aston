import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-matiere-card',
    templateUrl: './matiere-card.component.html',
    styles: []
})
export class MatiereCardComponent implements OnInit {
    @Input() mat;
    constructor() {}

    ngOnInit() {}
}
