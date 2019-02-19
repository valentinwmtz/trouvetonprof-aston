import { Component, Input, OnInit } from '@angular/core';
import { IMatiere } from 'app/shared/model/matiere.model';

@Component({
    selector: 'jhi-matiere-card',
    templateUrl: './matiere-card.component.html',
    styles: []
})
export class MatiereCardComponent implements OnInit {
    @Input() mat;
    matieres: IMatiere[];
    slides: any = [[]];
    constructor() {}
    chunk(arr, chunkSize) {
        let R = [];
        for (let i = 0, len = arr.length; i < len; i += chunkSize) {
            R.push(arr.slice(i, i + chunkSize));
        }
        return R;
    }
    ngOnInit() {
        this.slides = this.chunk(this.matieres, 3);
    }
}
