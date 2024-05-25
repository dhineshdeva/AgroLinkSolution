import { Injectable } from '@angular/core';
import { apiUrl } from 'src/apiconfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgroChemicals } from '../models/agrochemicals';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgrochemicalService {

  public apiUrl = apiUrl;

  constructor(private http: HttpClient) {

  }

  addAgrochemical(requestObject: AgroChemicals): Observable<AgroChemicals> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<AgroChemicals>(`${this.apiUrl}/agrochemicals/addAgrochemical`, requestObject, { headers });
  }

  getAgrochemicalByID(agrochemicalId: number): Observable<AgroChemicals> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<AgroChemicals>(`${this.apiUrl}/agrochemicals/getAgrochemicalByAgrochemicalID/${agrochemicalId}`, { headers });
  }
  getAllAgrochemicals(): Observable<AgroChemicals[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<AgroChemicals[]>(`${this.apiUrl}/agrochemicals/getAllAgrochemicals`, { headers });
  }
  deleteAgrochemical(agrochemicalId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/agrochemicals/deleteAgrochemicalByAgrochemicalID/${agrochemicalId}`, { headers });
}

updateAgrochemica(agrochemicalId: number, requestObject: AgroChemicals): Observable<AgroChemicals> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  return this.http.put<AgroChemicals>(`${this.apiUrl}/agrochemicals/updateAgrochemicalByAgrochemicalID/${agrochemicalId}`, requestObject, { headers });
}

}

