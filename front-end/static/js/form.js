// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/recipes';

// ---------------- IMPORT --------------------------------------------------------------------------------------------------------------------------------
import { postData } from './helpers/post.js';

// ---------------- ELEMENTS ------------------------------------------------------------------------------------------------------------------------------
const $formPage = document.getElementById('formPage');
const $addRecipeFormElement = document.getElementById('addRecipe');

// ---------------- HANDLE FORM ---------------------------------------------------------------------------------------------------------------------------
function handleFormSubmit($form) {
    const formData = new FormData($form);
    // Get all the data from the form
    const recipeTitle = formData.get('title');
    const recipeCategory = formData.get('category');
    const recipeIngredients = formData.get('ingredients');
    // Parse ingredients input for the json
    const recipeIngredientsArray = recipeIngredients.split('\n').map(function (line) {
        const parts = line.split(', ');
        return {
            name: parts[0],
            amount: parts[1]
        };
    });
    const recipeInstructions = formData.get('instructions');
    const recipeCookingTime = formData.get('cookingTime');
    const recipeDifficulty = formData.get('difficulty');
    const recipeServings = formData.get('servings');

    let recipe = {
        title: recipeTitle,
        category: recipeCategory,
        ingredients: recipeIngredientsArray,
        instructions: recipeInstructions,
        cookingTime: recipeCookingTime,
        difficulty: recipeDifficulty,
        servings: recipeServings
    };

    postData(API_URL, recipe).then(
        (onFulfilled) => {
            alert(`Recept: "${recipeTitle}" toevoegen is gelukt`);
            // Not working because of live server ev.preventDefault bug
            $formPage.innerHTML = ''
            $formPage.innerHTML = `
            <p>Recept: <strong>"${recipeTitle}"</strong> toevoegen is gelukt!</p>
            <a href="../recipeForm.html" role="button">Nog een recept toevoegen?</a>
            `
        },
        (onRejected) => {
            $formPage.innerHTML = ''
            $formPage.innerHTML = `
            <p>Recept: <strong>"${recipeTitle}"</strong> toevoegen is niet gelukt!</p>
            <a href="../recipeForm.html" role="button">Opnieuw proberen?</a>
            `
        }
    )
};

function submitEvent() {
    $addRecipeFormElement.addEventListener('submit', (ev) => {
        ev.preventDefault();
        handleFormSubmit($addRecipeFormElement);
    })
};

// ---------------- INITIALIZE APPLICATION ----------------------------------------------------------------------------------------------------------------
// Start the application
async function initialize () {
    submitEvent();
};

// Call the function for the application
initialize();