/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TrouvetonprofTestModule } from '../../../test.module';
import { DisponibiliteDeleteDialogComponent } from 'app/entities/disponibilite/disponibilite-delete-dialog.component';
import { DisponibiliteService } from 'app/entities/disponibilite/disponibilite.service';

describe('Component Tests', () => {
    describe('Disponibilite Management Delete Component', () => {
        let comp: DisponibiliteDeleteDialogComponent;
        let fixture: ComponentFixture<DisponibiliteDeleteDialogComponent>;
        let service: DisponibiliteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TrouvetonprofTestModule],
                declarations: [DisponibiliteDeleteDialogComponent]
            })
                .overrideTemplate(DisponibiliteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DisponibiliteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisponibiliteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
