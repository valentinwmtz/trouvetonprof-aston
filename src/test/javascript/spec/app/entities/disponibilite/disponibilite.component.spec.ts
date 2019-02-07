/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrouvetonprofTestModule } from '../../../test.module';
import { DisponibiliteComponent } from 'app/entities/disponibilite/disponibilite.component';
import { DisponibiliteService } from 'app/entities/disponibilite/disponibilite.service';
import { Disponibilite } from 'app/shared/model/disponibilite.model';

describe('Component Tests', () => {
    describe('Disponibilite Management Component', () => {
        let comp: DisponibiliteComponent;
        let fixture: ComponentFixture<DisponibiliteComponent>;
        let service: DisponibiliteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TrouvetonprofTestModule],
                declarations: [DisponibiliteComponent],
                providers: []
            })
                .overrideTemplate(DisponibiliteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DisponibiliteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisponibiliteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Disponibilite(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.disponibilites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
