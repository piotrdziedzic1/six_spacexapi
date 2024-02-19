import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, debounceTime, switchMap } from 'rxjs';

import { LaunchesService } from '../../services/launches.service';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-launches',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.css', '../../shared/styles/page.css']
})
export class LaunchesComponent {
  constructor(private launchesService: LaunchesService, private componentsService: ComponentsService) {
  }

  launches: Observable<any[]> | undefined;

  ngOnInit(): void {
    this.launches = this.componentsService.getQueryConfig.pipe(
      debounceTime(350),
      switchMap(searchString => this.launchesService.getLaunches()
      )
    )
  }
}
