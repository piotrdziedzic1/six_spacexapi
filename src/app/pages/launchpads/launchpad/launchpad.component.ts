import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { ComponentsService } from '../../../services/components.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable, map } from 'rxjs';

import { LaunchpadsService } from '../../../services/launchpads.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-launchpad',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    NgOptimizedImage
  ],
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.css', '../../../shared/styles/page.css']
})
export class LaunchpadComponent implements AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private launchpadsService: LaunchpadsService, 
    private componentsService: ComponentsService) {
  }

  dataSource = new MatTableDataSource();
  launch!: any;

  tableColumns: string[] = ['name','date_utc', 'success'];

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

     this.launchpadsService.getLaunchpads(id).subscribe(data => {
      this.launch = data[0];
      this.dataSource.data = data[0].launches;
  });
  }
}
