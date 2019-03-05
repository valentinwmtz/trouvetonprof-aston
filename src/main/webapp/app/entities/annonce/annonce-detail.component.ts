import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { DisponibiliteService } from 'app/entities/disponibilite';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import { CoursService } from 'app/entities/cours';
import { ICours } from 'app/shared/model/cours.model';
import { AccountService } from 'app/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationComponent } from 'app/entities/annonce/reservation/reservation.component';

@Component({
    selector: 'jhi-annonce-detail',
    templateUrl: './annonce-detail.component.html',
    styleUrls: ['./annonce-detail.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnnonceDetailComponent implements OnInit {
    basicDisponibilite: IDisponibilite[];
    annonce: IAnnonce;
    disponibilites = [];
    // timeline var
    alternate = true;
    toggle = true;
    color = false;
    size = 40;
    expandEnabled = true;
    side = 'right';
    isDisponibilitesloaded = false;
    moyenneNotes: number;
    cours: ICours[] = [];
    coursIsLoaded = false;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected activatedRoute: ActivatedRoute,
        protected jhiAlertService: JhiAlertService,
        private disponibiliteService: DisponibiliteService,
        private changeDetectorRef: ChangeDetectorRef,
        private coursService: CoursService,
        private accountService: AccountService,
        private modalService: NgbModal
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            console.error(account.id);
        });

        this.activatedRoute.data.subscribe(({ annonce }) => {
            this.annonce = annonce;
            console.error(annonce);
            this.disponibiliteService.findByAnnonceId(this.annonce.id).subscribe(
                (res: HttpResponse<IDisponibilite[]>) => {
                    this.basicDisponibilite = res.body;
                    console.error(this.basicDisponibilite);
                    const dispoStructured = this.stuctureDispoForTimeLine(res.body);
                    dispoStructured.forEach(dispo => {
                        this.disponibilites.push({
                            header: this.capitalizeAllFirstCharOfWord(dispo.header),
                            content: dispo.content,
                            dateDispo: dispo.dateDispo,
                            heureDispo: dispo.heureDispo,
                            minuteDispo: dispo.minuteDispo,
                            dureeDispo: dispo.dureeDispo
                        });
                    });
                    this.isDisponibilitesloaded = true;
                    this.changeDetectorRef.detectChanges();
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            this.coursService.findNotesMoyenneByAnnonceId(this.annonce.id).subscribe(
                (res: HttpResponse<number>) => {
                    this.moyenneNotes = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            this.coursService.findCoursByAnnonceId(this.annonce.id).subscribe(
                (res: HttpResponse<ICours[]>) => {
                    this.cours = res.body;
                    console.error(this.cours);
                    this.coursIsLoaded = true;
                    console.error(this.coursIsLoaded);
                    this.changeDetectorRef.detectChanges();
                    console.error(this.asNote);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        });
    }

    private stuctureDispoForTimeLine(disponibilites: IDisponibilite[]): Array<any> {
        const disponibilitesStructured = [];
        disponibilites.forEach(dispo => {
            if (!dispo.date.isBefore(Date.now())) {
                const dateDispo = dispo.date;
                const heureDispo = dispo.date.locale('fr').format('kk');
                const minuteDispo = dispo.date.locale('fr').format('mm');
                const dureeDispo = dispo.duree;
                const dateHeader = dispo.date.locale('fr').format('dddd MM MMMM YYYY');
                const dateContent = `De ${dispo.date.locale('fr').format('kk')}H${dispo.date.locale('fr').format('mm')}
                         à ${dispo.date
                             .add(dispo.duree, 'h')
                             .locale('fr')
                             .format('kk')}H${dispo.date.locale('fr').format('mm')}`;

                if (disponibilitesStructured.length === 0 || !disponibilitesStructured.some(dispoSome => dispoSome.header === dateHeader)) {
                    disponibilitesStructured.push({
                        header: dateHeader,
                        content: [dateContent],
                        dateDispo: [dateDispo],
                        heureDispo: [heureDispo],
                        minuteDispo: [minuteDispo],
                        dureeDispo: [dureeDispo]
                    });
                } else {
                    const index = disponibilitesStructured.findIndex(dispoIndex => dispoIndex.header === dateHeader);
                    disponibilitesStructured[index].content.push(dateContent);
                    disponibilitesStructured[index].dateDispo.push(dateDispo);
                    disponibilitesStructured[index].heureDispo.push(heureDispo);
                    disponibilitesStructured[index].minuteDispo.push(minuteDispo);
                    disponibilitesStructured[index].dureeDispo.push(dureeDispo);
                }
            }
        });
        return disponibilitesStructured;
    }

    private capitalizeAllFirstCharOfWord(string: String) {
        return string.replace(/(?:^|\s)\S/g, a => {
            return a.toUpperCase();
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        window.history.back();
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    onHeaderClick(event) {
        if (!this.expandEnabled) {
            event.stopPropagation();
        }
    }

    onDotClick(event) {
        if (!this.expandEnabled) {
            event.stopPropagation();
        }
    }

    onExpandEntry(expanded, index) {
        console.log(`Expand status of entry #${index} changed to ${expanded}`);
    }

    scrollToElement($element): void {
        console.log($element);
        $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

    openReservationModal(disponibilite) {
        const modalRef = this.modalService.open(ReservationComponent, { centered: true, size: 'lg' });
        modalRef.componentInstance.annonce = this.annonce;
        modalRef.componentInstance.basicDisponibilite = this.basicDisponibilite;
        modalRef.componentInstance.disponibilite = disponibilite;
    }

    get commentsNumber() {
        return this.cours.filter(cour => cour.commentaire != null).length;
    }

    get asNote() {
        return this.cours.filter(cour => cour.note != null).length > 0;
    }
}
