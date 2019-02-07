import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Profil } from 'app/shared/model/profil.model';
import { ProfilService } from './profil.service';
import { ProfilComponent } from './profil.component';
import { ProfilDetailComponent } from './profil-detail.component';
import { ProfilUpdateComponent } from './profil-update.component';
import { ProfilDeletePopupComponent } from './profil-delete-dialog.component';
import { IProfil } from 'app/shared/model/profil.model';

@Injectable({ providedIn: 'root' })
export class ProfilResolve implements Resolve<IProfil> {
    constructor(private service: ProfilService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profil> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Profil>) => response.ok),
                map((profil: HttpResponse<Profil>) => profil.body)
            );
        }
        return of(new Profil());
    }
}

export const profilRoute: Routes = [
    {
        path: 'profil',
        component: ProfilComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'profil/:id/view',
        component: ProfilDetailComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'profil/new',
        component: ProfilUpdateComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'profil/:id/edit',
        component: ProfilUpdateComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const profilPopupRoute: Routes = [
    {
        path: 'profil/:id/delete',
        component: ProfilDeletePopupComponent,
        resolve: {
            profil: ProfilResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'trouvetonprofApp.profil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
