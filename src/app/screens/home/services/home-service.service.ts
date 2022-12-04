import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http:HttpClient) { }
  getHomeStages() {
    return this.http.get(`${environment.apiUrl}stages_classes_home`)
  }
}
