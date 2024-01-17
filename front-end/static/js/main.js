// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/';

// ---------------- IMPORT --------------------------------------------------------------------------------------------------------------------------------
import { fetchData } from './helpers/fetch.js';
import { renderData } from './helpers/rendering/recipes.js';

// ---------------- ELEMENTS ------------------------------------------------------------------------------------------------------------------------------
const $recipesElement = document.getElementById('recipes');

// ---------------- INITIALIZE APPLICATION ----------------------------------------------------------------------------------------------------------------
// Start the application
async function initialize () {
    fetchData(`${API_URL}recipes`, data => {
        // Show all recipes
        renderData($recipesElement, data);
    });
};

// Call the function for the application
initialize();