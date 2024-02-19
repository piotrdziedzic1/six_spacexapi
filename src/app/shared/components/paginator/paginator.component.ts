import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsService } from '../../../services/components.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit {
  pagingConfig: any = {
      length: 0,
      pageSize: 5,
      pageIndex: 1,
      totalPages: 0,
      totalDocs: 0,
      previousPageIndex: 1,
      paginatorEl: null,
      pageSizeOptions: [5, 10, 25]
    };

  activeModule: string = 'home';

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private componentsService: ComponentsService) {

  }

  pageEvent!: PageEvent;

  ngOnInit(): void {
    this.componentsService.getQueryConfig.subscribe(queryConfig => {
      this.pagingConfig = queryConfig.pagingConfig;
    });

    this.componentsService.getActiveModule.subscribe(activeModule => {
      if (activeModule != '') {
        this.activeModule = activeModule;
      }
    });
  }

  ngAfterViewChecked(): void {
    // set paginator reference as soon as found in DOM
    if (!this.pagingConfig.paginatorEl && this.paginator) {
      this.pagingConfig.paginatorEl = this.paginator;
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pagingConfig.paginatorEl = this.paginator;
    this.pagingConfig.length = e.length;
    this.pagingConfig.pageSize = e.pageSize;
    this.pagingConfig.pageIndex = e.pageIndex;
    this.pagingConfig.previousPageIndex = e.previousPageIndex;
    this.componentsService.setPagingConfig(this.pagingConfig);

    const element = document.querySelector('.container');
    element?.scrollIntoView();
  }
}
