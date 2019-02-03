/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TrouvetonprofTestModule } from '../../../test.module';
import { DisponibiliteDetailComponent } from 'app/entities/disponibilite/disponibilite-detail.component';
import { Disponibilite } from 'app/shared/model/disponibilite.model';

describe('Component Tests', () => {
    describe('Disponibilite Management Detail Component', () => {
        let comp: DisponibiliteDetailComponent;
        let fixture: ComponentFixture<DisponibiliteDetailComponent>;
        const route = ({ data: of({ disponibilite: new Disponibilite(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TrouvetonprofTestModule],
                declarations: [DisponibiliteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DisponibiliteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DisponibiliteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.disponibilite).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
