import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iUsers } from '../interfaces/iusers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userUrl:string = "users.json"
  constructor(private http: HttpClient){}

  getUsers(): Observable<iUsers[]> {
    return this.http.get<iUsers[]>(this.userUrl)
  }

}
