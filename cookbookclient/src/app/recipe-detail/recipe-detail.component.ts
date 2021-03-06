import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../shared/model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe

  ingredients: string[] = []
  id: string
  errorMsg: string

  constructor(private activatedRoute:ActivatedRoute,
              private recipeSvc: RecipeService) {
    this.id = ""
    this.errorMsg = ""
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];
    console.log("id >>> " +this.id)

    // start of Task 5
    this.recipeSvc.getRecipe(this.id)
      .then(r => {
        this.recipe = r
        console.log("recipe >>> " +this.recipe)
      }).catch(msg => {
        this.errorMsg = "Recipe not found!"
      })
    // end of Task 5
  }

}
