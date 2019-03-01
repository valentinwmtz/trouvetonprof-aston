import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import moment = require('moment');
import { FormBuilder, Validators } from '@angular/forms';
import { Cours } from 'app/shared/model/cours.model';

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

    reservationForm = this.fb.group({
        heureDebut: ['', Validators.required],
        heureDeFin: ['', Validators.required],
        minuteDebut: ['', Validators.required],
        minuteDeFin: ['', Validators.required]
    });

    constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

    ngOnInit() {
        console.error(this.disponibilite.dateDispo[0].locale('fr').format('kk'));

        this.disponibilite.dateDispo.forEach(dispoDate => {
            console.log(dispoDate);
        });
        this.timePickerDebut = {
            hour: +this.disponibilite.heureDispo[0],
            minute: +this.disponibilite.minuteDispo[0],
            second: 0
        };
        this.timePickerFin = {
            hour: +this.disponibilite.dateDispo[0].locale('fr').format('kk'),
            minute: +this.disponibilite.dateDispo[0].locale('fr').format('mm'),
            second: 0
        };
        this.reservationForm.patchValue({
            heureDebut: +this.disponibilite.heureDispo[0],
            heureDeFin: +this.disponibilite.dateDispo[0].locale('fr').format('kk'),
            minuteDebut: +this.disponibilite.minuteDispo[0],
            minuteDeFin: +this.disponibilite.dateDispo[0].locale('fr').format('mm')
        });
    }

    reserver() {
        const dateDebut = moment(this.disponibilite.dateDispo[0])
            .set('hour', this.timePickerDebut.hour)
            .set('minute', this.timePickerDebut.minute);
        const dateDeFin = moment(this.disponibilite.dateDispo[0])
            .set('hour', this.timePickerFin.hour)
            .set('minute', this.timePickerFin.minute);
        const dureeHeure = moment.duration(dateDeFin.diff(dateDebut)).asHours();
        console.log('date debut : ' + dateDebut);
        console.log('date de fin : ' + dateDeFin);
        console.log('duree : ' + dureeHeure);
        const cours = new Cours(undefined, moment(Date.now()), 2, undefined, undefined, undefined, this.annonce, undefined, undefined);
    }
}
