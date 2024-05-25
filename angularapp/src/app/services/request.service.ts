import { Injectable } from '@angular/core';
import { apiUrl } from 'src/apiconfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgroChemicals } from '../models/agrochemicals';
import { Observable } from 'rxjs';
import { Requests } from '../models/request.model';
@Injectable({
    providedIn: 'root'
})
export class RequestService {

    public apiUrl = apiUrl;

    constructor(private http: HttpClient) {

    }

    addRequest(requestObject: Requests): Observable<Requests> {
        console.log("hai");
        console.log(requestObject);


        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.post<Requests>(`${this.apiUrl}/Request/addRequest`, requestObject, { headers });
    }

    getRequestByRequestId(requestId: number): Observable<Requests> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.get<Requests>(`${this.apiUrl}/Request/getRequestByRequestId/${requestId}`, { headers });
    }
    getAllRequest(): Observable<Requests[]> {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.get<Requests[]>(`${this.apiUrl}/Request/getAllRequest`, { headers });
    }
    deleteRequestByRequestId(requestId: number): Observable<void> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.delete<void>(`${this.apiUrl}/request/deleteRequestByRequestId/${requestId}`, { headers });
    }

    updateRequestByRequestId(requestId: number, requestObject: Requests): Observable<Requests> {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.put<Requests>(`${this.apiUrl}/request/updateRequestByRequestId/${requestId}`, requestObject, { headers });

    }

    getRequestByUserId(userId: number): Observable<Requests[]> {
        console.log("hai");
        console.log(userId);

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        return this.http.get<Requests[]>(`${this.apiUrl}/Request/getRequestByUserId/${userId}`, { headers });
    }

}
