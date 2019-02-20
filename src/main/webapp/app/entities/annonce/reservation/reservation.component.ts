import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-reservation',
    templateUrl: './reservation.component.html',
    styles: []
})
export class ReservationComponent implements OnInit {
    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}
}
