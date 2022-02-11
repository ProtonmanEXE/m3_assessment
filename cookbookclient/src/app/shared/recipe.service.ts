import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Recipe, RecipeHeader, ResponseMessage } from './model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  // Task 5 (from RecipeDetailComponent)
  getRecipe(id:string): Promise<Recipe> {
    return lastValueFrom(
      this.http.get<Recipe>("/recipe/".concat(id))
      // this.http.get<Recipe>("http://localhost:8080/recipe/".concat(id))
    )
  }

  // Task 4 (from RecipeListComponent)
  getAllRecipes(): Promise<RecipeHeader[]> {
    return lastValueFrom(
      this.http.get<RecipeHeader[]>("/recipepreviews")
      // this.http.get<RecipeHeader[]>("http://localhost:8080/recipepreviews")
    )
  }

  // Task 6 (from RecipeDetailComponent)
  sendFormToServer(recipe: Recipe): Promise<ResponseMessage> {
  console.log("recipe to pass to SB > ", recipe);
  return lastValueFrom(
    this.http.post<ResponseMessage>("/newrecipe", recipe))
    // this.http.post<ResponseMessage>("http://localhost:8080/newrecipe", recipe))
  }

}
