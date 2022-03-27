import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeAddComponent } from '../recipe-add/recipe-add.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: RecipeAddComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        console.log("guard triggered")
        if (component.newRecipe.dirty && component.newRecipe.valid
          && !component.recipeSave) {
          if (confirm("You have unsaved changes. \nAre you sure you want to leave?")) {
            component.newRecipe.reset()
            return true
          } else return false
        } else return true
        // return false will trigger guard and disallow navigation
      }

  // console.log("dirty or not >>> " +component.newRecipe.dirty)
  // console.log("valid or not >>> " +component.newRecipe.valid)
  // console.log("saving or not >>> " +component.recipeSave)

}
