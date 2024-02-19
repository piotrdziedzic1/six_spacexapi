import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { ComponentsService } from '../../services/components.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, debounceTime, switchMap } from 'rxjs';
import { CrewService } from '../../services/crew.service';

@Component({
  selector: 'app-crew',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css', '../../shared/styles/page.css']
})
export class CrewComponent {

  constructor(private crewService: CrewService, private componentsService: ComponentsService) {
  }

  crew: Observable<any[]> | undefined;

  ngOnInit(): void {
    this.crew = this.componentsService.getQueryConfig.pipe(
      debounceTime(350),
      switchMap(searchString => this.crewService.getCrew()
      )
    )
  }
}
