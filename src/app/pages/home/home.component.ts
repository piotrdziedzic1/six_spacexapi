import { Component, OnInit } from '@angular/core';

import { ComponentsService } from '../../services/components.service';
import { MaterialModule } from '../../shared/material.module';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../shared/styles/page.css']
})
export class HomeComponent implements OnInit {
  about!: any | null;
  
  constructor(private aboutService: AboutService, private componentsService: ComponentsService) {
    
  }

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe(
      (response: any) => this.about = response
    );
  }
}
