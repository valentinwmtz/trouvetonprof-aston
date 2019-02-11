import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'jhi-calendrier-header',
    templateUrl: './calendrier-header.component.html',
    styles: []
})
export class CalendrierHeaderComponent implements OnInit {

    @Input() view: string;

    @Input() viewDate: Date;

    @Input() locale = 'fr';

    @Output() viewChange: EventEmitter<string> = new EventEmitter();

    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        console.log('view ' + this.view);
    }
}
