import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAnnonce } from 'app/shared/model/annonce.model';

type EntityResponseType = HttpResponse<IAnnonce>;
type EntityArrayResponseType = HttpResponse<IAnnonce[]>;

@Injectable({ providedIn: 'root' })
export class AnnonceService {
    public resourceUrl = SERVER_API_URL + 'api/annonces';
    constructor(protected http: HttpClient) {}

    create(annonce: IAnnonce): Observable<EntityResponseType> {
        return this.http.post<IAnnonce>(this.resourceUrl, annonce, { observe: 'response' });
    }

    update(annonce: IAnnonce): Observable<EntityResponseType> {
        return this.http.put<IAnnonce>(this.resourceUrl, annonce, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAnnonce>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    findAllByMatiereId(id: number): Observable<EntityArrayResponseType> {
        return this.http.get<IAnnonce[]>(`${this.resourceUrl}/matieres/${id}`, { observe: 'response' });
    }
    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAnnonce[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
