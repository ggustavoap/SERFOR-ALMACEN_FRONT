import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { PuestoControl } from 'app/shared/models/puesto-control.model';
import { PuestoControlResponse } from 'app/shared/models/response/puestocontrol-response';

@Injectable({
  providedIn: 'root'
})
export class PuestoControlService {

  private base: string = '';
  constructor(private http: HttpClient) {
    this.base = environment.urlProcesos + "/api/serfor/puestoControl";
  }

  // getPuestoControlSearch(idATF: Number): Observable<PuestoControl[]> {
  //   let url = `${this.base}?idAtf=${idATF}`;
  //   return this.http.get<PuestoControl[]>((url)).pipe(catchError(this.errorHandler));
  // }

  getPuestoControlSearch(puestoControlRequest:PuestoControl, page: number, size: number): Observable<PuestoControlResponse> {
    let url = `${this.base}?pageNumber=${page}&pageSize=${size}&sortType=DESC`; 
      if(puestoControlRequest.idAtf){
        url += `&idAtf=${puestoControlRequest.idAtf}`
      }
       return this.http.get<PuestoControlResponse>((url)).pipe(catchError(this.errorHandler));
    } 

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error || 'SERVER ERROR');
  }

}