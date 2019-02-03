/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TrouvetonprofTestModule } from '../../../test.module';
import { DomaineDetailComponent } from 'app/entities/domaine/domaine-detail.component';
import { Domaine } from 'app/shared/model/domaine.model';

describe('Component Tests', () => {
    describe('Domaine Management Detail Component', () => {
        let comp: DomaineDetailComponent;
        let fixture: ComponentFixture<DomaineDetailComponent>;
        const route = ({ data: of({ domaine: new Domaine(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TrouvetonprofTestModule],
                declarations: [DomaineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DomaineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DomaineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.domaine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
