import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacadeService } from './facade.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) {}

  public esquemaEvento() {
    return {
      'titulo': '',
      'descripcion': '',
      'fecha_inicio': '',
      'fecha_fin': '',
      'lugar': '',
      'tipo_evento': '',
      'publico_objetivo': '',
      'link': '',
    };
  }

  // Validación del formulario
  public validarEvento(data: any, editar: boolean) {
    console.log("Validando evento... ", data);
    let error: any = [];

    if (!this.validatorService.required(data["titulo"])) {
      error["titulo"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["descripcion"])) {
      error["descripcion"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["fecha_inicio"])) {
      error["fecha_inicio"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["fecha_fin"])) {
      error["fecha_fin"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["lugar"])) {
      error["lugar"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["tipo_evento"])) {
      error["tipo_evento"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["publico_objetivo"])) {
      error["publico_objetivo"] = this.errorService.required;
    }



    return error;
  }

  // CRUD HTTP Services

  public registrarEvento(data: any): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${environment.url_api}/eventos/`, data, { headers });
  }

  public obtenerEventos(): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>(`${environment.url_api}/lista-eventos/`, { headers });
  }

  public getEventoByID(idEvento: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/eventos/?id=${idEvento}`, httpOptions);
  }

  public editarEvento(data: any): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.put<any>(`${environment.url_api}/eventos-edit/`, data, { headers });
  }

  public eliminarEvento(idEvento: number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete<any>(`${environment.url_api}/eventos-edit/?id=${idEvento}`, { headers });
  }
}
