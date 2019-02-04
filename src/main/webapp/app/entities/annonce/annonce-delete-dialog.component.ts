import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnnonce } from 'app/shared/model/annonce.model';
import { AnnonceService } from './annonce.service';

@Component({
    selector: 'jhi-annonce-delete-dialog',
    templateUrl: './annonce-delete-dialog.component.html'
})
export class AnnonceDeleteDialogComponent {
    annonce: IAnnonce;

    constructor(protected annonceService: AnnonceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.annonceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'annonceListModification',
                content: 'Deleted an annonce'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-annonce-delete-popup',
    template: ''
})
export class AnnonceDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ annonce }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AnnonceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.annonce = annonce;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/annonce', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/annonce', { outlets: { popup: null } }]);
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
