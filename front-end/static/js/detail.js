// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/recipes/:id';

// ---------------- REQUIRE -------------------------------------------------------------------------------------------------------------------------------
import { fetchData } from './helpers/fetch.js';
import { renderDetailItem } from './helpers/recipes.js';
import { deleteData } from './helpers/delete.js';

// ---------------- ELEMENTS ------------------------------------------------------------------------------------------------------------------------------
const $detailPage = document.getElementById('detailPage')
const $recipeDetailElement = document.getElementById('recipe-detail');
const $deleteRecipeElement = document.getElementById('deleteRecipe');

// ---------------- GET THE SELECTED ID -------------------------------------------------------------------------------------------------------------------
function getSelectedRecipeId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
};

// ---------------- DELETE RECIPE -------------------------------------------------------------------------------------------------------------------------
function deleteRecipe() {
    $deleteRecipeElement.addEventListener('click', async () => {
        // Ask for confirmation
        const confirmed = window.confirm('Zeker dat volgende recept mag verwijdert worden?');
        if (confirmed) {
            const selectedId = getSelectedRecipeId();
            const api = API_URL.replace(':id', selectedId);
            // Delete the recipe
            await deleteData(api);
            // Go back to home
            window.location.href = 'index.html';
        }
    });
}

// ---------------- INITIALIZE APPLICATION ----------------------------------------------------------------------------------------------------------------
// Start the application
async function initialize () {
    // Function to delete a recipe
    deleteRecipe()
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