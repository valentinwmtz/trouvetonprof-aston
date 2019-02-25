import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import moment = require('moment');

@Component({
    selector: 'jhi-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
    annonce: IAnnonce;
    disponibilite: any;
    basicDisponibilite: IDisponibilite[];
    timePickerDebut: NgbTimeStruct;
    timePickerFin: NgbTimeStruct;
    hourStep = 1;
    minuteStep = 5;

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {
        console.error(this.disponibilite);
        this.disponibilite.dateDispo.forEach(dispoDate => {
            console.log(dispoDate.locale('fr').format('kk'));
        });
        this.timePickerDebut = { hour: 2, minute: 30, second: 0 };
        this.timePickerFin = { hour: 4, minute: 10, second: 0 };
    }
}
