import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GoogleService {
  constructor (
    private http: Http
  ) {}

  loginUser(googleUser: any){

    /**
     *
     */
    return this.http.post(`localhost:8000/users/`, googleUser)
      .map((res:Response) => res.json());
  }

}
