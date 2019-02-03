/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TrouvetonprofTestModule } from '../../../test.module';
import { DisponibiliteUpdateComponent } from 'app/entities/disponibilite/disponibilite-update.component';
import { DisponibiliteService } from 'app/entities/disponibilite/disponibilite.service';
import { Disponibilite } from 'app/shared/model/disponibilite.model';

describe('Component Tests', () => {
    describe('Disponibilite Management Update Component', () => {
        let comp: DisponibiliteUpdateComponent;
        let fixture: ComponentFixture<DisponibiliteUpdateComponent>;
        let service: DisponibiliteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TrouvetonprofTestModule],
                declarations: [DisponibiliteUpdateComponent]
            })
                .overrideTemplate(DisponibiliteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DisponibiliteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisponibiliteService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Disponibilite(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.disponibilite = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Disponibilite();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.disponibilite = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
