import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }


  registerUser(data){
    return this.http.post('http://localhost:3000/api/register-users', data);
  }

  loginUser(data){
    return this.http.post('http://localhost:3000/api/login', data);
  }
}
