package ibf2021.assessment.csf.server.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;

/* Write your request hander in this file */

@RestController
@RequestMapping(path="/getrecipepreviews", produces=MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class RecipesRestController {

    @Autowired
    RecipeService recipeSvc;

    private final static Logger logging = LoggerFactory.getLogger(RecipesRestController.class);

    @GetMapping // Task 4 (from Angular RecipeService)
    public ResponseEntity<String> getReviews() {
        JsonArrayBuilder recipeArray = Json.createArrayBuilder();
        for (Recipe recipe : recipeSvc.getAllRecipes()) {
            JsonObjectBuilder recipeBuilder = Json.createObjectBuilder();
            recipeBuilder.add("id", recipe.getId());
            recipeBuilder.add("title", recipe.getTitle());
            recipeArray.add(recipeBuilder.build());
        }
        // check REST controller's return (payload)
        logging.info("payload: %s".formatted(recipeArray)); 
        return ResponseEntity.ok().body(recipeArray.build().toString());
    }
}
