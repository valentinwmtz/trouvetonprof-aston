/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrouvetonprofTestModule } from '../../../test.module';
import { DomaineComponent } from 'app/entities/domaine/domaine.component';
import { DomaineService } from 'app/entities/domaine/domaine.service';
import { Domaine } from 'app/shared/model/domaine.model';

describe('Component Tests', () => {
    describe('Domaine Management Component', () => {
        let comp: DomaineComponent;
        let fixture: ComponentFixture<DomaineComponent>;
        let service: DomaineService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TrouvetonprofTestModule],
                declarations: [DomaineComponent],
                providers: []
            })
                .overrideTemplate(DomaineComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DomaineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomaineService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Domaine(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.domaines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
