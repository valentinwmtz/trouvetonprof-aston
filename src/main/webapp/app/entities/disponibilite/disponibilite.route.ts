import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Disponibilite } from 'app/shared/model/disponibilite.model';
import { DisponibiliteService } from './disponibilite.service';
import { DisponibiliteComponent } from './disponibilite.component';
import { DisponibiliteDetailComponent } from './disponibilite-detail.component';
import { DisponibiliteUpdateComponent } from './disponibilite-update.component';
import { DisponibiliteDeletePopupComponent } from './disponibilite-delete-dialog.component';
import { IDisponibilite } from 'app/shared/model/disponibilite.model';

@Injectable({ providedIn: 'root' })
export class DisponibiliteResolve implements Resolve<IDisponibilite> {
    constructor(private service: DisponibiliteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDisponibilite> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Disponibilite>) => response.ok),
                map((disponibilite: HttpResponse<Disponibilite>) => disponibilite.body)
            );
        }
        return of(new Disponibilite());
    }
}

export const disponibiliteRoute: Routes = [
    {
        path: '',
        component: DisponibiliteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.disponibilite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DisponibiliteDetailComponent,
        resolve: {
            disponibilite: DisponibiliteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.disponibilite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DisponibiliteUpdateComponent,
        resolve: {
            disponibilite: DisponibiliteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.disponibilite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DisponibiliteUpdateComponent,
        resolve: {
            disponibilite: DisponibiliteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.disponibilite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const disponibilitePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DisponibiliteDeletePopupComponent,
        resolve: {
            disponibilite: DisponibiliteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.disponibilite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
