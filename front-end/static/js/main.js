// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/recipes';

// ---------------- FETCH THE DATA ------------------------------------------------------------------------------------------------------------------------
async function fetchData(url, callback) {
    try {
        const response = await fetch(url)
        if (response.status === 200) {
            const data = await response.json();
            callback(data)
        } else {
            throw new Error('Er ging iets mis met de API.')
        }
    } catch (error) {
        console.error(error.message);
    }
};

// ---------------- REQUIRE -------------------------------------------------------------------------------------------------------------------------------
import { renderData } from './recipes.js';

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
    console.log(filterRecipesByValue(recipes, formDataValue));
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
    // Console checks
};

// Call the function for the application
initialize();