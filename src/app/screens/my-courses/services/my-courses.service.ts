import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyCoursesService {


  constructor(private http:HttpClient) { }
  getMyCourses() {
    return this.http.get(`${environment.apiUrl}my_courses`)
  }
}
