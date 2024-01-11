const fsp = require('fs/promises');
const path = require('path')
const recipesFilePath = path.join(__dirname, '..', 'data', 'recipes.json');

async function getRecipes(request, response) {
    try {
        const data = await fsp.readFile(recipesFilePath);
        const recipes = JSON.parse(data)
        response.json(recipes);
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
    }
};

function getRecipe() {

};

function addRecipe() {
    
};

function editRecipe() {
    
};

function removeRecipe() {
    
};

//Exceleren
function getCategories() {
    
};

function getIngredients() {
    
};

function getDifficultyLevels() {
    
};

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