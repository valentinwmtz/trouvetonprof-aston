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
import { MatiereListComponent } from 'app/entities/matiere/matiere-list/matiere-list.component';
import { MatiereResolve } from 'app/entities/matiere';
import { AnnonceListComponent } from 'app/entities/annonce/annonce-list/annonce-list.component';

@Injectable({ providedIn: 'root' })
export class AnnonceResolve implements Resolve<IAnnonce> {
    constructor(private service: AnnonceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Annonce> {
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
        path: 'annonce',
        component: AnnonceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.annonce.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annonce/:id/view',
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
        path: 'annonce/matiere/:id/view',
        component: AnnonceListComponent,
        resolve: {
            matiere: MatiereResolve
        },
        data: {
            pageTitle: 'trouvetonprofApp.matiere.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annonce/new',
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
        path: 'annonce/:id/edit',
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
        path: 'annonce/:id/delete',
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
