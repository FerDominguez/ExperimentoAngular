import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor( private http:HttpClient ) { }

  llamarApi(url:any){
    return this.http.get(`${url}`);
  }

}
