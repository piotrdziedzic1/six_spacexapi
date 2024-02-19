import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { ComponentsService } from '../../services/components.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, debounceTime, switchMap } from 'rxjs';

import { LaunchpadsService } from '../../services/launchpads.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-launchpads',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgOptimizedImage,
    RouterModule
  ],
  templateUrl: './launchpads.component.html',
  styleUrls: ['./launchpads.component.css', '../../shared/styles/page.css']
})
export class LaunchpadsComponent {
  constructor(private launchpadsService: LaunchpadsService, private componentsService: ComponentsService) {
  }

  launchpads: Observable<any[]> | undefined;

  ngOnInit(): void {
    this.launchpads = this.componentsService.getQueryConfig.pipe(
      debounceTime(350),
      switchMap(searchString => this.launchpadsService.getLaunchpads()
      )
    )
  }
}
