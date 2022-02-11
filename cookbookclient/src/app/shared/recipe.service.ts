import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Recipe, RecipeHeader } from './model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  // Task 5 (from RecipeDetailComponent)
  getRecipe(id:string): Promise<Recipe> {
    return lastValueFrom(
      this.http.get<Recipe>("http://localhost:8080/recipe/".concat(id))
      // same as this.http.get<Weather>(`http://localhost:8080/api/weather/${city}`)
      // this.http.get<Weather>(`/api/weather/${city}`)
    )
  }

  // Task 4 (from RecipeListComponent)
  getAllRecipes(): Promise<RecipeHeader[]> {
    return lastValueFrom(
      this.http.get<RecipeHeader[]>("http://localhost:8080/getrecipepreviews")
      // same as this.http.get<Weather>(`http://localhost:8080/api/weather/${city}`)
      // this.http.get<Weather>(`/api/weather/${city}`)
    )
  }
}
