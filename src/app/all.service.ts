import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class requestsService {
  private url = "http://nets.tj:8000"

  constructor(private http: HttpClient, private router: Router) {}

  authRequest(account_id: number, password: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post( this.url + "/api/auth/login", {"account_id": account_id, "password": password}, {headers: header})
  }

  refreshTokenRequest() {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'token_type': 'bearer',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
    return this.http.get(this.url + '/api/auth/refresh', {headers: header})
  }

  error(error: any) {
    alert(error.error.error)
    if(error.status == 401) {
      this.refreshTokenRequest().subscribe( (response: any) => {
        localStorage.setItem('access_token', response.access_token)
        location.reload()
      }, error => {
        localStorage.clear()
        this.router.navigate(['/'])
      })
    }
  }

  getRequest(dataUrl: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'token_type': 'bearer',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
    return this.http.get( this.url + dataUrl, {headers: header})
  }
  getRequestByID() {}


  postRequest(dataUrl: any, body: any) {
    let header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'token_type': 'bearer',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
    return this.http.post( this.url + dataUrl, body, {headers: header})
  }
  putRequest() {}


  deleteRequest() {}
}
