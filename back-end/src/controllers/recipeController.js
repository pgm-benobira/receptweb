const fsp = require('fs/promises');
const path = require('path')
const { v4: generateRandomId } = require('uuid')

// ---------------- REUSED FUNCTIONS ----------------------------------------------------------------------------------------------------------------------
// Set status to 500 and show error message
function showErrorMessage(response, error) {
    return response.status(500).json({
        message: error.message
    })
}

// Get the recipes from the file
async function getRecipesFromFile(filePath) {
    try {
        const data = await fsp.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        return `Failed to read/parse file: ${error.message}`
    }
};

// Upload the edited file again
async function uploadRecipesToFile(filePath, recipes) {
    return await fsp.writeFile(filePath, JSON.stringify(recipes, null, 4));
};

// ---------------- RECIPES FILEPATH ----------------------------------------------------------------------------------------------------------------------
const recipesFilePath = path.join(__dirname, '..', 'data', 'recipes.json');

// ---------------- GET RECIPES ---------------------------------------------------------------------------------------------------------------------------
async function getRecipes(request, response) {
    try {
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Give back the recipes
        response.json(recipes);
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ---------------- GET A RECIPE --------------------------------------------------------------------------------------------------------------------------
async function getRecipe(request, response) {
    try {
        // Get the recipe id from the request parameters
        const {id} = request.params;
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Find recipe with given id
        const recipe = recipes.find((recipe) => JSON.stringify(recipe.id) === id);
        // Give back the recipe with the correct id
        response.json(recipe);
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ---------------- ADD RECIPE ----------------------------------------------------------------------------------------------------------------------------
async function addRecipe(request, response) {
    try {
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Push the new recipe to the rest of the recipes
        recipes.push({
            ...request.body,
            id: generateRandomId()
        })

        // Upload the edited file again
        await uploadRecipesToFile(recipesFilePath, recipes);
        response.send(`Nieuwe recept met naam ${request.body.title} is toegevoegd.`);
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ---------------- EDIT RECIPE ---------------------------------------------------------------------------------------------------------------------------
async function editRecipe(request, response) {
    try {
        // Get the recipe id from the request parameters
        const {id} = request.params;
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Find recipe with given id
        const recipe = recipes.find((recipe) => JSON.stringify(recipe.id) === id);
        // Replace the old recipe with the new updated
        

        // Upload the edited file again
        await uploadRecipesToFile(recipesFilePath, recipes);
        response.send(`Recept updated met id: ${id}!`);
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ---------------- REMOVE RECIPE -------------------------------------------------------------------------------------------------------------------------
async function removeRecipe(request, response) {
    try {
        // Get the recipe id from the request parameters
        const {id} = request.params;
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Find recipe with given id
        const recipe = recipes.find((recipe) => JSON.stringify(recipe.id) === id);

        // Upload the edited file again
        await uploadRecipesToFile(recipesFilePath, recipes);
        response.send(`Nieuwe recept met naam ${request.body.title} is toegevoegd.`);
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ================ EXCELEREN =============================================================================================================================
// ---------------- GET CATEGORIES ------------------------------------------------------------------------------------------------------------------------
async function getCategories(request, response) {
    try {
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Extract unique categories
        const categories = [...new Set(recipes.map(recipe => recipe.category))];
        // Give back the recipes categories
        response.json(categories);
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ---------------- GET INGREDIENTS -----------------------------------------------------------------------------------------------------------------------
async function getIngredients(request, response) {
    try {
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Extract unique ingredients
        const ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.name)))];
        // Give back the recipes ingredients
        response.json(ingredients)
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ---------------- GET DIFFICULTY LEVELS -----------------------------------------------------------------------------------------------------------------
async function getDifficultyLevels(request, response) {
    try {
        // Get the recipes from the file
        const recipes = await getRecipesFromFile(recipesFilePath);
        // Extract unique difficultyLevels
        const difficultyLevels = [...new Set(recipes.map(recipe => recipe.difficulty))];
        // Give back the recipes difficultyLevels
        response.json(difficultyLevels);
    } catch (error) {
        showErrorMessage(response, error);
    }
};

// ---------------- EXPORT MODULES ------------------------------------------------------------------------------------------------------------------------
module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    removeRecipe,
    getCategories,
    getIngredients,
    getDifficultyLevels,
}