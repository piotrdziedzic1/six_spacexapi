import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { ComponentsService } from './components.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaunchpadsService {

  constructor(private componentsService: ComponentsService, private http: HttpClient) { }

  getLaunchpads(id: string | null = ''): Observable<any> {
    let pagingConfig = this.componentsService.queryConfig.getValue().pagingConfig;
    let searchString = this.componentsService.queryConfig.getValue().searchString;
    
    let query = {};

    if (id) {
      query = { "_id": id }
    }

    query = query || (!id && searchString ?
      {
        "$or": [
          { "name": { "$regex": searchString, "$options": "i" } },
          { "full_name": { "$regex": searchString, "$options": "i" } },          
          { "region": { "$regex": searchString, "$options": "i" } }
        ]
      } : {})

    return this.http.post<any>(`${this.componentsService.spacexApiUrl}/launchpads/query`,
      {
        "query": query,
        "options": {
          "limit": pagingConfig.pageSize,
          "page": pagingConfig.pageIndex != pagingConfig.previousPageIndex ? pagingConfig.pageIndex + 1 : 0,
          "populate": [
            "launches"
          ]
        }
      }).pipe(
        shareReplay(),
        map((response: any) => {
          pagingConfig.length = response.totalDocs
          if (response.totalDocs < (pagingConfig.pageSize * pagingConfig.pageIndex) && pagingConfig.pageIndex != 0) {
            pagingConfig.paginatorEl.firstPage();
          }
          return response.docs
        })
      )
  }
}
