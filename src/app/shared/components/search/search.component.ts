import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsService } from '../../../services/components.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  activeModule: string = 'home';

  value = 'Clear me';

  constructor(private componentsService: ComponentsService) {
    
  }
  
  ngOnInit(): void {
    this.componentsService.getActiveModule.subscribe(activeModule => {
      if (activeModule != '') {
        this.searchValue = '';
        this.activeModule = activeModule;
      }
    });
  }

  onSearchTextChanged() {
    this.componentsService.setSearchString(this.searchValue);
  }

  onClear() {
    this.searchValue = '';
    this.onSearchTextChanged();
  }
}
