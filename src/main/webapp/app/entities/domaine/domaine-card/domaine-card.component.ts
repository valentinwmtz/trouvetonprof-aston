import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-domaine-card',
    templateUrl: './domaine-card.component.html',
    styles: []
})
export class DomaineCardComponent implements OnInit {
    @Input() dom;
    constructor() {}

    ngOnInit() {}
}
