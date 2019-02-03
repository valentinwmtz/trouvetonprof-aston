import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDisponibilite } from 'app/shared/model/disponibilite.model';

type EntityResponseType = HttpResponse<IDisponibilite>;
type EntityArrayResponseType = HttpResponse<IDisponibilite[]>;

@Injectable({ providedIn: 'root' })
export class DisponibiliteService {
    public resourceUrl = SERVER_API_URL + 'api/disponibilites';

    constructor(protected http: HttpClient) {}

    create(disponibilite: IDisponibilite): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(disponibilite);
        return this.http
            .post<IDisponibilite>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(disponibilite: IDisponibilite): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(disponibilite);
        return this.http
            .put<IDisponibilite>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDisponibilite>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDisponibilite[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(disponibilite: IDisponibilite): IDisponibilite {
        const copy: IDisponibilite = Object.assign({}, disponibilite, {
            date: disponibilite.date != null && disponibilite.date.isValid() ? disponibilite.date.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((disponibilite: IDisponibilite) => {
                disponibilite.date = disponibilite.date != null ? moment(disponibilite.date) : null;
            });
        }
        return res;
    }
}
