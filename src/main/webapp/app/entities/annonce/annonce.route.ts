import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Annonce } from 'app/shared/model/annonce.model';
import { AnnonceService } from './annonce.service';
import { AnnonceComponent } from './annonce.component';
import { AnnonceDetailComponent } from './annonce-detail.component';
import { AnnonceUpdateComponent } from './annonce-update.component';
import { AnnonceDeletePopupComponent } from './annonce-delete-dialog.component';
import { IAnnonce } from 'app/shared/model/annonce.model';

@Injectable({ providedIn: 'root' })
export class AnnonceResolve implements Resolve<IAnnonce> {
    constructor(private service: AnnonceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAnnonce> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Annonce>) => response.ok),
                map((annonce: HttpResponse<Annonce>) => annonce.body)
            );
        }
        return of(new Annonce());
    }
}

export const annonceRoute: Routes = [
    {
        path: '',
        component: AnnonceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.annonce.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AnnonceDetailComponent,
        resolve: {
            annonce: AnnonceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.annonce.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AnnonceUpdateComponent,
        resolve: {
            annonce: AnnonceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.annonce.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AnnonceUpdateComponent,
        resolve: {
            annonce: AnnonceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.annonce.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const annoncePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AnnonceDeletePopupComponent,
        resolve: {
            annonce: AnnonceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.annonce.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
