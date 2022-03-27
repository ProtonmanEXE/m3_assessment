import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  butDisabled: boolean
  recipeSave: boolean

  constructor(private fb: FormBuilder,
              private recipeSvc: RecipeService,
              private router: Router) {
    this.butDisabled = true
    this.recipeSave = false
  }

  ngOnInit(): void {
    this.newRecipe = this.fb.group({   // Task 6 - forms for user to add recipe
      title: ["", [ Validators.required, Validators.minLength(3) ]],
      ingredients: this.fb.array([]),
      instruction: ["", [ Validators.required, Validators.minLength(3) ]],
      image: ["", Validators.required ],
    })
    this.ingredients.push(
      this.fb.control("", [Validators.required, Validators.minLength(3)]));
  }

  // getter for ingredients
  get ingredients() {
    return this.ingredientArray = this.newRecipe.get("ingredients") as FormArray
  }

  // start of Task 6
  // Task 6 - buttons to add and remove ingredients
  addIngredientList() {
    this.ingredients.push(
      this.fb.control("", [Validators.required, Validators.minLength(3)]));
    this.ingredients.length > 1 ?
      this.butDisabled = false : this.butDisabled = true
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index)
    this.ingredients.length > 1 ?
      this.butDisabled = false : this.butDisabled = true
  }

  saveRecipe() {
    console.log(this.newRecipe)
    const recipe: Recipe = this.newRecipe.value as Recipe

    this.recipeSvc.sendFormToServer(recipe)
      .then(result => {
        this.newRecipe.reset();
        console.info('>>>> result: ', result);
      }).catch(() => {
        alert("There appears to be a problem with the server")
      })

    this.recipeSave = true
    this.goHome()
  }

  goHome() {
    this.router.navigate(["/"])
  }
  // end of Task 6

}
