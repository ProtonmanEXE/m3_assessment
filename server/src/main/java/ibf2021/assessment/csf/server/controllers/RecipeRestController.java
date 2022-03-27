package ibf2021.assessment.csf.server.controllers;

import java.io.IOException;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

/* Write your request hander in this file */

@RestController
@RequestMapping(produces=MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class RecipeRestController {

    @Autowired
    RecipeService recipeSvc;

    private final static Logger logging = LoggerFactory.getLogger(RecipesRestController.class);

    @GetMapping(path="/recipe/{id}") 
    // Task 5 (from Angular RecipeService)
    public ResponseEntity<String> getCustomer(@PathVariable String id) throws IOException {
        
        Optional<Recipe> optRecipe = recipeSvc.getRecipeById(id);
        logging.info("optRecipe > " +optRecipe); 

        if (optRecipe.isPresent()) {
            Recipe recipe = optRecipe.get();

            // construct Json object (payload)
            // JsonArrayBuilder ingredientsBuilder = Json.createArrayBuilder();
            // for (String ingredient: recipe.getIngredients()) {
            //     System.out.println("ingredient >>> " +ingredient);
            //     ingredientsBuilder.add(ingredient);
            //     logging.info("ingredientsBuilder: %s".formatted(ingredientsBuilder)); 
            // }
            // JsonArray ingredients = ingredientsBuilder.build();
            // JsonObject payload = Json.createObjectBuilder()
            //     .add("title", recipe.getTitle())
            //     .add("id", recipe.getId())
            //     .add("image", recipe.getImage())
            //     .add("instruction", recipe.getInstruction())
            //     .add("ingredients", ingredients)
            //     .build();
            logging.info("ingredients: %s".formatted(recipe.getIngredients())); 
            JsonObject payload = Json.createObjectBuilder()
                .add("title", recipe.getTitle())
                .add("id", recipe.getId())
                .add("image", recipe.getImage())
                .add("instruction", recipe.getInstruction())
                .add("ingredients", Json.createArrayBuilder(recipe.getIngredients()))
                .build();
            
            // check REST controller's return (payload)
            logging.info("payload: %s".formatted(payload)); 
            return ResponseEntity
                .status(HttpStatus.CREATED).body(payload.toString());
        } else {
            // if recipe id is non-existent
            logging.info("Recipe does not exist!");
            JsonObject payload = Json.createObjectBuilder()
                .add("message", "No such id")
                .build();
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND).body(payload.toString());
        }

    }

    @PostMapping(path="/newrecipe", consumes=MediaType.APPLICATION_JSON_VALUE)
    // Task 6 (from Angular RecipeService)
    public ResponseEntity<String> saveReviews(@RequestBody Recipe recipe) {

        recipeSvc.addRecipe(recipe);
        logging.info("all recipes: %s".formatted(recipeSvc.getAllRecipes())); 
        return ResponseEntity.status(HttpStatus.CREATED).body("");

    }

}