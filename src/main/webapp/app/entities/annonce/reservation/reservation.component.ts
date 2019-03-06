import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import moment = require('moment');
import { FormBuilder, Validators } from '@angular/forms';
import { Cours, ICours } from 'app/shared/model/cours.model';
import { CoursService } from 'app/entities/cours';
import { MatSnackBar } from '@angular/material';

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

    constructor(
        public activeModal: NgbActiveModal,
        private coursService: CoursService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

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
        const cours = new Cours(undefined, dateDebut, dureeHeure, undefined, undefined, undefined, this.annonce, undefined, undefined);
        this.openCheckout(this.annonce, dureeHeure, cours);
    }

    openCheckout(annonce: IAnnonce, dureeHeure, cours: ICours) {
        const handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_y4BMPjpeY0wiczztookLlSl9',
            locale: 'auto',
            token: function(token: any) {}
        });
        handler.open({
            name: 'TrouveTonProf',
            description: 'description',
            amount: annonce.prixHoraire * dureeHeure * 100,
            currency: 'EUR',
            closed: () => {
                console.log('closed');
                this.coursService.create(cours).subscribe(response => {
                    console.log(response);
                    this.activeModal.close();
                    this.snackBar.open('Réservation effectué avec succès')._dismissAfter(3000);
                });
            }
        });
    }
}
