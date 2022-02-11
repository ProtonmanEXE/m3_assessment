import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeHeader } from '../shared/model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeList: RecipeHeader[] = [];

  constructor(private router:Router,
              private recipeSvc: RecipeService) {
    this.recipeList = []
  }

  ngOnInit(): void {
    // start of Task 4
    this.recipeSvc.getAllRecipes()
    .then(dbReviewList => {
      this.recipeList = dbReviewList
      console.info("this.recipeList = ", this.recipeList )
    })
    // end of Task 4
  }

}
