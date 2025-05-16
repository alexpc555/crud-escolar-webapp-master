import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventosService } from 'src/app/services/eventos.services';
import { FacadeService } from 'src/app/services/facade.service';
declare var $: any;


@Component({
  selector: 'app-registro-eventos',
  templateUrl: './registro-eventos.component.html',
  styleUrls: ['./registro-eventos.component.scss']
})
export class EventosComponent implements OnInit {
  @Input() datos_evento: any = {};

  public evento: any = {};
  public errors: any = {};
  public editar: boolean = false;

  public programas: string[] = ['Ingeniería 1', 'Ingeniería 2', 'Ingeniería 3'];
  public publicos: string[] = ['Estudiantes', 'Profesores', 'Publico General'];

  constructor(
    private eventosService: EventosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private facadeService: FacadeService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      this.evento = this.datos_evento;
    } else {
      this.evento = this.eventosService.esquemaEvento();
      this.evento.publico_objetivo = [];
    }
  }

  public regresar() {
    this.location.back();
  }

  public registrar() {
    this.errors = this.eventosService.validarEvento(this.evento, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    this.eventosService.registrarEvento(this.evento).subscribe(
      (response) => {
        alert('Evento registrado correctamente');
        this.router.navigate(['home']);
      },
      (error) => {
        alert('No se pudo registrar el evento');
      }
    );
  }

  public actualizar() {
    this.errors = this.eventosService.validarEvento(this.evento, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    this.eventosService.editarEvento(this.evento).subscribe(
      (response) => {
        alert('Evento actualizado correctamente');
        this.router.navigate(['home']);
      },
      (error) => {
        alert('No se pudo actualizar el evento');
      }
    );
  }

  public checkboxPublicoChange(event: any) {
    if (event.checked) {
      this.evento.publico_objetivo.push(event.source.value);
    } else {
      this.evento.publico_objetivo = this.evento.publico_objetivo.filter((p: string) => p !== event.source.value);
    }
  }

  public revisarPublico(valor: string) {
    return this.evento.publico_objetivo?.includes(valor);
  }

  public changeFechaInicio(event: any) {
    this.evento.fecha_inicio = event.value?.toISOString().split("T")[0];
  }

  public changeFechaFin(event: any) {
    this.evento.fecha_fin = event.value?.toISOString().split("T")[0];
  }
}