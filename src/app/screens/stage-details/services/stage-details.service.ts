import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StageDetailsService {
  constructor(private http:HttpClient) { }
  getHomeStages(id:any) {
    return this.http.get(`${environment.apiUrl}stage/${id}`)
  }
}
