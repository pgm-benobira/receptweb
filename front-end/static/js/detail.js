// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/recipes/:id';

// ---------------- REQUIRE -------------------------------------------------------------------------------------------------------------------------------
import { fetchData } from './helpers/fetch.js';
import { renderDetailItem } from './helpers/recipes.js';

// ---------------- ELEMENTS ------------------------------------------------------------------------------------------------------------------------------
const $recipeDetailElement = document.getElementById('recipe-detail');

// ---------------- GET THE SELECTED ID -------------------------------------------------------------------------------------------------------------------
function getSelectedRecipeId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
};

// ---------------- INITIALIZE APPLICATION ----------------------------------------------------------------------------------------------------------------
// Start the application
async function initialize () {
    const selectedId = getSelectedRecipeId();
    console.log(selectedId);
    const api = API_URL.replace(':id', selectedId);
    fetchData(api, data => {
        // Show the recipe detail from the id
        renderDetailItem($recipeDetailElement, data)
    });
};

// Call the function for the application
initialize();