import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http : HttpClient) { }

  register(data):Observable<any>{
    return this.http.post<any>('/register',data);
  }

  login(data):Observable<any>{
    return this.http.post<any>('/login',data);
  }

  sessionCheck():Observable<any>{
    return this.http.get<any>('/sessCheck');
  }

  userData():Observable<any>{
    return this.http.get<any>('/details');
  }

}
