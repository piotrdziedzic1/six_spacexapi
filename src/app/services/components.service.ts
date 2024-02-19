import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  spacexApiUrl = environment.spacexApiUrl;

  constructor(private http: HttpClient) {

  }

  public activeModule = new BehaviorSubject<string>('');
  public queryConfig = new BehaviorSubject<any>({
    searchString: '',
    pagingConfig: {
      length: 0,
      pageSize: 5,
      pageIndex: 0,
      totalPages: 0,
      totalDocs: 0,
      previousPageIndex: 0,
      paginatorEl: null,
      pageSizeOptions: [5, 10, 25]
    }
  });

  getActiveModule = this.activeModule.asObservable();
  getQueryConfig = this.queryConfig.asObservable();

  setQueryConfig(queryConfig: {}) {
    this.queryConfig.next(queryConfig);
  }

  setSearchString(searchString: string) {
    this.setQueryConfig(Object.assign({}, { searchString: searchString }, { pagingConfig: this.queryConfig.getValue().pagingConfig }))
  }

  setPagingConfig(pagingConfig: {}) {
    this.setQueryConfig(Object.assign({}, { searchString: this.queryConfig.getValue().searchString }, { pagingConfig: pagingConfig }));
  }

  setActiveModule(module: string) {
    this.activeModule.next(module);
    this.setSearchString('');
    this.queryConfig.getValue().pagingConfig.paginatorEl?.firstPage();
  }
}
