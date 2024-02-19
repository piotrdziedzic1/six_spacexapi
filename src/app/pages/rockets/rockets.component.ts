import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { ComponentsService } from '../../services/components.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, debounceTime, switchMap } from 'rxjs';
import { RocketsService } from '../../services/rockets.service';

@Component({
  selector: 'app-rockets',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './rockets.component.html',
  styleUrls: ['./rockets.component.css', '../../shared/styles/page.css']
})
export class RocketsComponent {

  constructor(private rocketsService: RocketsService, private componentsService: ComponentsService) {
  }

  rockets: Observable<any[]> | undefined;

  ngOnInit(): void {
    this.rockets = this.componentsService.getQueryConfig.pipe(
      debounceTime(350),
      switchMap(searchString => this.rocketsService.getRockets()
      )
    )
  }
}
