import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {


  constructor(private http:HttpClient) { }
  getSubjects(id:any,page:any) {
    return this.http.get(`${environment.apiUrl}materials_class/${id}`,{params:{page}})
  }
  getSubjectsWithSpecialist(id:any,specialistId:any,page:any) {
    return this.http.get(`${environment.apiUrl}materials_class/${id}/${specialistId}`,{params:{page}})
  }
  getOffer(id:any) {
    return this.http.get(`${environment.apiUrl}class_offers/${id}`)
  }
  getOfferWithSpecialist(id:any,specialistId:any) {
    return this.http.get(`${environment.apiUrl}class_offers/${id}/${specialistId}`)
  }
}
