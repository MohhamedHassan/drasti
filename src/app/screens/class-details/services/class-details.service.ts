import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassDetailsService {
  constructor(private http: HttpClient) {}
  getClassDetails(id: any) {
    return this.http.get(`${environment.apiUrl}material/${id}`);
  }
  getOfferDetails(id: any) {
    return this.http.get(`${environment.apiUrl}class_offers/${id}`);
  }
  classUnites(id: any) {
    return this.http.get(`${environment.apiUrl}material_units/${id}`);
  }
  classLessons(id: any) {
    return this.http.get(`${environment.apiUrl}material_lessons/${id}`);
  }
  addQuestion(payload: { material_id: string; question: string }) {
    return this.http.post(`${environment.apiUrl}add_question`, payload);
  }
  addAnswer(payload: {
    material_id: string;
    answer: string;
    student_id: string;
  }) {
    return this.http.post(`${environment.apiUrl}add_answer`, payload);
  }
}
