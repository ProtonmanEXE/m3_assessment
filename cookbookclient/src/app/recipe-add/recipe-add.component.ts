import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../shared/model';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  newRecipe!: FormGroup

  ingredientArray!: FormArray

  constructor(private fb: FormBuilder,
              private recipeSvc: RecipeService,
              private router: Router) {
    this.newRecipe = this.fb.group({   // Task 6 - forms for user to add recipe
      title: new FormControl("test", [ Validators.required, Validators.min(3) ]),
      ingredients: new FormArray([], [ Validators.required ]),
      instruction: new FormControl("add add", [ Validators.required, Validators.min(3) ]),
      image: new FormControl("132", Validators.required),
    })
    this.ingredientArray = this.newRecipe.get("ingredients") as FormArray
  }

  ngOnInit(): void { }

  // start of Task 6
  // Task 6 - buttons to add and remove ingredients
  addIngredientList() {
    const control = new FormControl("test first", Validators.required);
    (<FormArray>this.newRecipe.get("ingredients")).push(control)
  }

  removeIngredient(index: number) {
    (<FormArray>this.newRecipe.get("ingredients")).removeAt(index)
  }

  saveRecipe() {
    console.log(this.newRecipe)
    const recipe: Recipe = this.newRecipe.value as Recipe

    this.recipeSvc.sendFormToServer(recipe)
      .then(result => {
        this.newRecipe.reset();
        console.info('>>>> result: ', result);
      })

    this.router.navigate(["/"])
  }

  goHome() {
    this.newRecipe.reset()
    this.router.navigate(["/"])
  }
  // end of Task 6

}
