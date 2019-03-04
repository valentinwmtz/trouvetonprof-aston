import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICours } from 'app/shared/model/cours.model';

type EntityResponseType = HttpResponse<ICours>;
type EntityArrayResponseType = HttpResponse<ICours[]>;

@Injectable({ providedIn: 'root' })
export class CoursService {
    public resourceUrl = SERVER_API_URL + 'api/cours';

    constructor(protected http: HttpClient) {}

    create(cours: ICours): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cours);
        return this.http
            .post<ICours>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cours: ICours): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cours);
        return this.http
            .put<ICours>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICours>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    findNotesMoyenneByAnnonceId(id: number): Observable<any> {
        return this.http.get<number>(`${this.resourceUrl}/moyenne/notes/${id}`, { observe: 'response' });
    }

    findCoursByAnnonceId(id: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICours[]>(`${this.resourceUrl}/annonce/${id}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICours[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(cours: ICours): ICours {
        const copy: ICours = Object.assign({}, cours, {
            date: cours.date != null && cours.date.isValid() ? cours.date.toJSON() : null
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
            res.body.forEach((cours: ICours) => {
                cours.date = cours.date != null ? moment(cours.date) : null;
            });
        }
        return res;
    }
}
