import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ComponentsService } from './components.service';
import { HttpClient } from '@angular/common/http';

import { About } from '../models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private componentsService: ComponentsService, private http: HttpClient) { }

  getAbout(): Observable<About> {
    return this.http.get<About>(`${this.componentsService.spacexApiUrl}/company`)
  }
}
