const API_URL = 'https://api.api-ninjas.com/v1/recipe?query=pasta'
const options = {
    method: 'GET',
    headers: {
        'X-Api-Key': 'UmGdvbARfQ41r9BOpvxJpA==gEsNGQrVYWk9UNRj'
    },
    contentType: 'application/json'
};

const $recipesElement = document.getElementById('recipes')

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

function renderData(data) {
    $recipesElement.innerHTML = '';
    data.forEach(item => {
        renderItem($recipesElement, item)
    });
};

function renderItem($recipesElement, item) {
    $recipesElement.innerHTML += `
    <a href="./detail.html?recipe=${item.title}" class="recipe__inner">
        <article>
            <h3>🍝  ${item.title}</h3>
            <strong>🤔  What do you need?</strong>
            <p>${item.ingredients}</p>
            <strong>👨‍👩‍👧‍👦  Servings</strong>
            <p>${item.servings}</p>
            <strong>📖  Instructions</strong>
            <p>${item.instructions}</p>
        </article>
    </a>
    `;
};

function initialize() {
    fetchData(API_URL, renderData)
}

initialize()