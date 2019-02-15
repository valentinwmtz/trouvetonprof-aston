import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Domaine } from 'app/shared/model/domaine.model';
import { DomaineService } from './domaine.service';
import { DomaineComponent } from './domaine.component';
import { DomaineDetailComponent } from './domaine-detail.component';
import { DomaineUpdateComponent } from './domaine-update.component';
import { DomaineDeletePopupComponent } from './domaine-delete-dialog.component';
import { IDomaine } from 'app/shared/model/domaine.model';

@Injectable({ providedIn: 'root' })
export class DomaineResolve implements Resolve<IDomaine> {
    constructor(private service: DomaineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDomaine> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Domaine>) => response.ok),
                map((domaine: HttpResponse<Domaine>) => domaine.body)
            );
        }
        return of(new Domaine());
    }
}

export const domaineRoute: Routes = [
    {
        path: '',
        component: DomaineComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.domaine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DomaineDetailComponent,
        resolve: {
            domaine: DomaineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.domaine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DomaineUpdateComponent,
        resolve: {
            domaine: DomaineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.domaine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DomaineUpdateComponent,
        resolve: {
            domaine: DomaineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.domaine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const domainePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DomaineDeletePopupComponent,
        resolve: {
            domaine: DomaineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.domaine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
