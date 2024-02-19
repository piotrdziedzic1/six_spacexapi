import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, debounceTime, switchMap } from 'rxjs';

import { LandpadsService } from '../../services/landpads.service';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-landpads',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './landpads.component.html',
  styleUrls: ['./landpads.component.css', '../../shared/styles/page.css']
})
export class LandpadsComponent {
  constructor(private landpadsService: LandpadsService, private componentsService: ComponentsService) {
  }

  landpads: Observable<any[]> | undefined;

  ngOnInit(): void {
    this.landpads = this.componentsService.getQueryConfig.pipe(
      debounceTime(350),
      switchMap(searchString => this.landpadsService.getLandpads()
      )
    )
  }
}
