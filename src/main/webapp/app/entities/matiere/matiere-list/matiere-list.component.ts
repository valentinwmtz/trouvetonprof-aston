import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatiereService } from 'app/entities/matiere';
import { IMatiere } from 'app/shared/model/matiere.model';

@Component({
    selector: 'jhi-matiere-list',
    templateUrl: './matiere-list.component.html',
    styleUrls: ['./matiere-list.component.css']
})
export class MatiereListComponent implements OnInit {
    matieres: IMatiere[];

    constructor(private route: ActivatedRoute, private matiereService: MatiereService) {}

    ngOnInit() {
        this.matiereService.findAllByDomaineId(this.route.snapshot.params.id).subscribe(response => {
            this.matieres = response.body;
            console.log(this.matieres);
        });
    }
}
