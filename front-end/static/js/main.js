// ---------------- API URL -------------------------------------------------------------------------------------------------------------------------------
const API_URL = 'http://localhost:8989/api/';

// ---------------- IMPORT --------------------------------------------------------------------------------------------------------------------------------
import { fetchData } from './helpers/fetch.js';
import { renderData } from './helpers/rendering/recipes.js';
import { renderCategories } from './helpers/rendering/categories.js';

// ---------------- ELEMENTS ------------------------------------------------------------------------------------------------------------------------------
const $recipesElement = document.getElementById('recipes');
const $formElement = document.getElementById('filterRecipe');
const $categoriesElement = document.getElementById('categories');
const $resetButton = document.getElementById('resetFilters');

// ---------------- FILTER ON CATEGORY --------------------------------------------------------------------------------------------------------------------
function filterRecipesByCategory(recipes, selectedCategory) {
    return recipes.filter((recipe) => recipe.category === selectedCategory)
};

function removeActiveCateogry() {
    const $previouslyActiveCategory = document.querySelector('.category--active');
    if ($previouslyActiveCategory) {
        $previouslyActiveCategory.classList.remove('category--active');
    }
}

function resetRecipesFitlter(data) {
    $resetButton.addEventListener('click', () => {
        removeActiveCateogry()
        renderData($recipesElement, data);
    });
};

function showFilteredRecipes(data) {
    // Add click event listener to each category button
    const $categoryButtons = document.querySelectorAll('.category');
    $categoryButtons.forEach(($categoryButton) => {
        $categoryButton.addEventListener('click', () => {
            removeActiveCateogry()
            $categoryButton.classList.add('category--active');
            const selectedCategory = $categoryButton.dataset.category; // Assuming data-category attribute contains the category value
            const filteredRecipes = filterRecipesByCategory(data, selectedCategory);
            // Show the filtered recipes
            renderData($recipesElement, filteredRecipes);
        });
    });
    // Reset the applied filter
    resetRecipesFitlter(data);
};

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
    if (filteredRecipesData.length === 0) {
        return $recipesElement.innerHTML = `<p>Geen resultaten voor "<strong>${formDataValue}</strong>"</p>`
    }
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
    fetchData(`${API_URL}categories`, data => {
        // Show all categories
        renderCategories($categoriesElement, data);
    });
    fetchData(`${API_URL}recipes`, data => {
        // Handling the form event
        submitEvent(data);
        // Show all recipes
        renderData($recipesElement, data);
        // Show filtered recipes
        showFilteredRecipes(data);
    });
};

// Call the function for the application
initialize();