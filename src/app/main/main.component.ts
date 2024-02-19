import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MaterialModule } from '../shared/material.module';

import { HeaderComponent } from "../layout/header/header.component";
import { PaginatorComponent } from "../shared/components/paginator/paginator.component";
import { FooterComponent } from '../layout/footer/footer.component';

import { ComponentsService } from '../services/components.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AsyncPipe,
    HeaderComponent,
    PaginatorComponent,
    FooterComponent
  ]
})

export class MainComponent {
  activeModule: string = 'home';

  constructor(private router: Router, private componentsService: ComponentsService) {

  }

  ngOnInit(): void {
    // subscribe to route events to set toolbar title
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveModule(event.urlAfterRedirects.substring(1).split(/\//)[0]);
      }
    });
  }

  private breakpointObserver = inject(BreakpointObserver);

  searchText: string = '';

  isSmallScreen$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  setActiveModule(module: string) {
    this.activeModule = module;
    this.componentsService.setActiveModule(module);
  }
}
