// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/recipes';

// ---------------- REQUIRE -------------------------------------------------------------------------------------------------------------------------------
import { fetchData } from './helpers/fetch.js';
import { renderData } from './helpers/recipes.js';

// ---------------- ELEMENTS ------------------------------------------------------------------------------------------------------------------------------
const $recipesElement = document.getElementById('recipes');
const $formElement = document.getElementById('filterRecipe');

// ---------------- HANDLE FORM ---------------------------------------------------------------------------------------------------------------------------
function filterRecipesByValue(recipes, value) {
    return recipes.filter((recipe) => {
        return (
            recipe.title.toLowerCase().includes(value.toLowerCase()) ||
            recipe.category.toLowerCase().includes(value.toLowerCase())
        )
    });
};

function handleFormSubmit(recipes, $form) {
    const formData = new FormData($form);
    const formDataValue = formData.get('filter');
    const filteredRecipesData = filterRecipesByValue(recipes, formDataValue);
    return renderData($recipesElement, filteredRecipesData);
};

function submitEvent(recipes) {
    $formElement.addEventListener('submit', (ev) => {
        ev.preventDefault();
        handleFormSubmit(recipes, $formElement);
    })
};

// ---------------- INITIALIZE APPLICATION ----------------------------------------------------------------------------------------------------------------
// Start the application
async function initialize () {
    const api = API_URL;
    fetchData(api, data => {
        // Handling the form event
        submitEvent(data)
        // Show all recipes
        renderData($recipesElement, data)
    });
};

// Call the function for the application
initialize();