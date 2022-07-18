import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }
  httpPostObservable(method: string, data: string) {
    return new Observable<any>(observer=>{
      this.http.post(`${this.apiUrl}/${method}`, data)
      .subscribe(result=>{
          observer.next(result);
      })
    });  
  }
  httpGetObservable(method: string) {
    return new Observable<any>(observer=>{
      this.http.get(`${this.apiUrl}/${method}`)
      .subscribe(result=>{
          observer.next(result);
      })
    });  
  }
}
