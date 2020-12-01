import { Component } from '@angular/core';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_ListItem } from '../model';

const DEFAULT_CATEGORY: string = "pasta"

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  meals: MEALDB_ListItem[] | null = null;
  categories: string[] = [];

  constructor(private mealDb: MealdbApiService) {
    this.mealDb.findByCategory(DEFAULT_CATEGORY)
      .subscribe((meals: MEALDB_ListItem[]) => {
        this.meals = meals;
      })
    ;
    this.mealDb.getAllCategories()
      .subscribe(categories => this.categories = categories)
  }

  filterByCategory(event: any) {
    this.mealDb.findByCategory(event.target.value)
      .subscribe((meals: MEALDB_ListItem[]) => {
        this.meals = meals;
      })
    ;
  }

}
