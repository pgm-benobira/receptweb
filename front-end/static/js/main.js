// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/';

// ---------------- IMPORT --------------------------------------------------------------------------------------------------------------------------------
import { fetchData } from './helpers/fetch.js';
import { renderRandomData } from './helpers/rendering/recipes.js';

// ---------------- ELEMENTS ------------------------------------------------------------------------------------------------------------------------------
const $recipesElement = document.getElementById('randomRecipe');

// ---------------- INITIALIZE APPLICATION ----------------------------------------------------------------------------------------------------------------
// Start the application
async function initialize () {
    fetchData(`${API_URL}recipes`, data => {
        // Show the two random recipes
        renderRandomData($recipesElement, data, 2)
    });
};

// Call the function for the application
initialize();