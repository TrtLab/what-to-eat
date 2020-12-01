import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_Meal } from '../model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  meal: MEALDB_Meal | null = null;
  ingredients: string[] = [];

  constructor(private mealDB: MealdbApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    let mealId = this.route.snapshot.paramMap.get("id");
    this.mealDB.findById(mealId)
      .pipe(
        tap(meal =>  this.ingredients = this.getIngredients(meal))
      )
      .subscribe(meal => this.meal = meal);
  }

  getYoutubeLink(meal: MEALDB_Meal): SafeResourceUrl {
    let videoId = meal.strYoutube.split("=")[1];
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + videoId);
  }

  // Get ingredients from meal
  getIngredients(meal: MEALDB_Meal): string[] {
    let ingredients: string[] = [];
    for (let index = 1; index <= 20; index++) {
      let currentIngredient = meal["strIngredient" + index];
      let currentMeasure = meal["strMeasure" + index];
      if(currentIngredient != "") ingredients.push(currentIngredient + ", " + currentMeasure);
    }
    return ingredients;
  }
}
