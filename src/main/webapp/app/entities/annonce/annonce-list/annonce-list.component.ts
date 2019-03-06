import { Component, OnInit } from '@angular/core';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { AnnonceService } from 'app/entities/annonce';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-annonce-list',
    templateUrl: './annonce-list.component.html',
    styleUrls: ['./annonce-list.component.css']
})
export class AnnonceListComponent implements OnInit {
    annonces: IAnnonce[];
    eleveChecked = true;
    professeurChecked = true;
    localisationFilter = '';

    constructor(private annonceService: AnnonceService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.annonceService.findAllByMatiereId(this.route.snapshot.params.id).subscribe((res: HttpResponse<IAnnonce[]>) => {
            this.annonces = res.body;
        });

        /*        this.annonceService.query().subscribe((res: HttpResponse<IAnnonce[]>) => {
            this.annonces = res.body;
            console.log(res.body);
        });*/
    }

    get statusFilter() {
        if (this.eleveChecked && this.professeurChecked) {
            return ['ELEVE', 'PROFESSEUR'];
        } else if (this.professeurChecked) {
            return ['PROFESSEUR'];
        } else if (this.eleveChecked) {
            return ['ELEVE'];
        } else {
            return ['Aucun'];
        }
    }
}
