/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TrouvetonprofTestModule } from '../../../test.module';
import { ProfilComponent } from 'app/entities/profil/profil.component';
import { ProfilService } from 'app/entities/profil/profil.service';
import { Profil } from 'app/shared/model/profil.model';

describe('Component Tests', () => {
    describe('Profil Management Component', () => {
        let comp: ProfilComponent;
        let fixture: ComponentFixture<ProfilComponent>;
        let service: ProfilService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TrouvetonprofTestModule],
                declarations: [ProfilComponent],
                providers: []
            })
                .overrideTemplate(ProfilComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProfilComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfilService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Profil(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.profils[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
