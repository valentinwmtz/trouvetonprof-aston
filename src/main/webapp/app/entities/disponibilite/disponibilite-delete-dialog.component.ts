import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDisponibilite } from 'app/shared/model/disponibilite.model';
import { DisponibiliteService } from './disponibilite.service';

@Component({
    selector: 'jhi-disponibilite-delete-dialog',
    templateUrl: './disponibilite-delete-dialog.component.html'
})
export class DisponibiliteDeleteDialogComponent {
    disponibilite: IDisponibilite;

    constructor(
        protected disponibiliteService: DisponibiliteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.disponibiliteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'disponibiliteListModification',
                content: 'Deleted an disponibilite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-disponibilite-delete-popup',
    template: ''
})
export class DisponibiliteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ disponibilite }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DisponibiliteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.disponibilite = disponibilite;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/disponibilite', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/disponibilite', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
