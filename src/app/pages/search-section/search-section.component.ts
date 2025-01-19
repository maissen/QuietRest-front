import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { NarratorsService } from 'src/app/services/narrators.service';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit {

  parameterType: string | null = null;
  parameterValue: string | null = null;
  api_speeches_of_narrator = 'http://localhost:2003/api/speeches-of-narrator/';
  api_speeches_oplaylists_by_category = 'http://localhost:2003/api/speeches-playlists-by-category/';

  data: any;
  narratorName: string = '';
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient,
    public narrators: NarratorsService,
    public categories: CategoriesService
  ) { }

  ngOnInit(): void {
    // Fetch all categories first

    this.route.paramMap.subscribe(params => {

      if (this.router.url.includes('/narrator')) {

        this.parameterType = 'narrator';
        this.parameterValue = params.get('narratorID');
        this.http.get(this.api_speeches_of_narrator + this.parameterValue).subscribe(
          (res: any) => {
            this.data = res;
          },
          (err) => {
            console.log(err);
          }
        );
      
      } 
      else if (this.router.url.includes('/category')) {
      
        this.parameterType = 'category';
        this.parameterValue = params.get('categoryID');
        this.http.get(this.categories.api_get_all_categories).subscribe(
          (res: any) => {
            this.categories.setAllCategories(res);
          },
          (err) => {
            console.log(err);
          }
        );

        this.http.get(this.api_speeches_oplaylists_by_category + this.parameterValue).subscribe(
          (res: any) => {

            this.data = res;
            const category = this.categories.getAllCategories().find(category => category.id == this.parameterValue);
            
            if (category) {
              this.categoryName = category.name;
            } else {
              console.log('Category not found!');
            }
          
          },
          (err) => {
            console.log(err);
          }
        );
      
      } 
      else if (this.router.url.includes('/time')) {
      
        this.parameterType = 'time';
        this.parameterValue = params.get('timeID');
      
      }
    });
  }
}
