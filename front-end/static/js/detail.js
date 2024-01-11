const API_URL = 'https://api.api-ninjas.com/v1/recipe?query=pasta'
const options = {
    method: 'GET',
    headers: {
        'X-Api-Key': 'UmGdvbARfQ41r9BOpvxJpA==gEsNGQrVYWk9UNRj'
    },
    contentType: 'application/json'
};

const $detailRecipeElement = document.getElementById('detail-recipe')

async function fetchData(url, callback) {
    try {
        const response = await fetch(url, options)
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

const urlParams = new URLSearchParams(window.location.search);
let selectedRecipe = urlParams.get('recipe');

function filteredEventsByRecipe(recipes, selectedRecipe) {
    return recipes.filter((recipe) => recipe.title === selectedRecipe);
};

function generateHTMLForRecipe (item) {
    return `
    <h2>🍝  ${item.title}</h2>
    <strong>🤔  What do you need?</strong>
    <p>${item.ingredients}</p>
    <strong>👨‍👩‍👧‍👦  Servings</strong>
    <p>${item.servings}</p>
    <strong>📖  Instructions</strong>
    <p>${item.instructions}</p>
    `
}

function renderRecipeDetail(data) {
    const filteredRecipe = filteredEventsByRecipe(data, selectedRecipe);
    console.log(filteredRecipe[0]);
    $detailRecipeElement.innerHTML = generateHTMLForRecipe(filteredRecipe[0]);
}

function initialize() {
    fetchData(API_URL, data => {
        renderRecipeDetail(data)})
    console.log('Geselecteerd recept', selectedRecipe)
}

initialize()