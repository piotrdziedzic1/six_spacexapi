import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ComponentsService } from '../../services/components.service';
import { SearchComponent } from "../../shared/components/search/search.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [
        MaterialModule,
        AsyncPipe,
        SearchComponent,
        CommonModule
    ]
})
export class HeaderComponent implements OnInit {
  @Input() isSmallScreen: boolean | null = false;
  @Input() drawer: any;

  activeModule: string = 'home';

  constructor(private router: Router, private componentsService: ComponentsService) {

  }

  ngOnInit(): void {
    this.componentsService.getActiveModule.subscribe(activeModule => {
      this.activeModule = activeModule;
    });
  }
}
