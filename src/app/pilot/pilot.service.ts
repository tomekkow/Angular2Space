import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Pilot } from './pilot';

@Injectable()
export class PilotService {
  constructor(private http: Http) { }

  getPilots(): Observable<Pilot[]> {
    return this.http.get('/api/pilots')
     .catch((response) => Observable.throw('Nie udało się pobrać pilotów'))
      .map((response) => response.json().map((pilotAttrs) => new Pilot(pilotAttrs)));
  }
  getPilot(id: number): Observable<Pilot> {
    return this.http.get('/api/pilots/' + id)
     .catch((response) => Observable.throw('Nie udało się pobrać pilota'))
      .map((response) => new Pilot(response.json()));
  }
  getPilotByLastName(lastName: string): Observable<Pilot> {
    const searchParams = new URLSearchParams();
    searchParams.set('lastName', lastName);
    return this.http.get('/api/pilots', {search: searchParams})
      .map((response) => {
        const attrs = response.json()[0];
        return attrs ? new Pilot(attrs) : null;
      });
  }

  savePilot(pilot: Pilot): Observable<Response> {
    if (pilot.id) {
      return this.updatePilot(pilot);
    } else {
      return this.createPilot(pilot);
    }
  }

  private createPilot(pilot: Pilot): Observable<Response> {
    return this.http.post('/api/pilots', pilot)
      .catch((response) => Observable.throw('Nie można utworzyć pilota'));
  }

  private updatePilot(pilot: Pilot): Observable<Response> {
    return this.http.put(`/api/pilots/${pilot.id}`, pilot)
      .catch((response) => Observable.throw('Nie można zaktualizować pilota'));
}
  
}
  
  
  
