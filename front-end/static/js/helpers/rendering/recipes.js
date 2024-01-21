// ---------------- RENDER ONE RECIPE ---------------------------------------------------------------------------------------------------------------------
function renderItemContent(item) {
    return `
    <a href="./detail.html?id=${item.id}" class="recipe-teaser">
        <div class ="recipe-top">
            <h3>${item.title}</h3>
            <div class="quick-info">
                <p class="servings">${item.servings} pers.</p>
                <p class="cookingTime">${item.cookingTime} min.</p>
            </div>
        </div>
        <div class ="recipe-middle">
            <p class="ingredients"><strong>Nodig:</strong> ${item.ingredients.map(ingredient => `<span>${ingredient.name}: ${ingredient.amount}</span>`).join(', ')}</p>
        </div>
        <div class ="recipe-bottom">
            ${item.difficulty === 'Gemakkelijk' ? `<p class="difficulty"><img src="./static/img/gemakkelijk.png" alt=""> ${item.difficulty}</p>` : ''}
            ${item.difficulty === 'Gemiddeld' ? `<p class="difficulty"><img src="./static/img/gemiddeld.png" alt=""> ${item.difficulty}</p>` : ''}
            ${item.difficulty === 'Moeilijk' ? `<p class="difficulty"><img src="./static/img/moeilijk.png" alt=""> ${item.difficulty}</p>` : ''}
            <button class="detail-link">Instructies</button>
        </div>
    </a>
    `
}

function renderRecipe($element, item) {
    $element.innerHTML += `
    ${renderItemContent(item)}
    `;
};

// ---------------- RENDER DETAIL RECIPE ------------------------------------------------------------------------------------------------------------------
export function renderDetailItem($element, item) {
    $element.innerHTML = '';
    $element.innerHTML += `
    <section href="./detail.html?id=${item.id}" class="recipe-detail">
        <div class="recipe-top">
            <div>
                <h1>${item.title}</h1>
                <p>Categorie: ${item.category}</p>
            </div>
            <button onclick="history.back()" class="go-back">Terug</button>
        </div>
        <div class="recipe-detail__content">
            <div class="recipe-middle">
                <div class="ingredietns__wrapper">
                    <p><strong>Wat heb je nodig?</strong></p> ${item.ingredients.map(ingredient => `<p>${ingredient.name}: ${ingredient.amount}</p>`).join('')}
                </div>
                <div class="instrcutions__wrapper">
                    <p class="instructions"><strong>Instrcuties:</strong></p><p class="instructions">${item.instructions}</p>
                </div>
            </div>
            <div class="recipe-bottom">
                <p class="servings">Voor ${item.servings} personen</p>
                <p class="cookingTime">Kooktijd: ${item.cookingTime} minuten</p>
                ${item.difficulty === 'Gemakkelijk' ? `<p class="difficulty"><img src="./static/img/gemakkelijk.png" alt=""> ${item.difficulty}</p>` : ''}
                ${item.difficulty === 'Gemiddeld' ? `<p class="difficulty"><img src="./static/img/gemiddeld.png" alt=""> ${item.difficulty}</p>` : ''}
                ${item.difficulty === 'Moeilijk' ? `<p class="difficulty"><img src="./static/img/moeilijk.png" alt=""> ${item.difficulty}</p>` : ''}
            </div>
        </div>
    </section>
    `;
};

// ---------------- RENDER DETAIL RECIPE FORM -------------------------------------------------------------------------------------------------------------
export function renderEditDetailForm($element, item) {
    $element.innerHTML = '';
    $element.innerHTML = `
    <section class="form__wrapper" id="form">
        <div class="recipe-top">
            <h1>Recept aanpassen</h1>
            <a href="./detail.html?id=${item.id}" class="go-back go-back--cancel">Annuleren</a>
        </div>
        <form class="form" id="editRecipe">
            <section class="form__top">
                <div>
                    <label for="recipeTitle"><strong>Naam recept:</strong></label>
                    <input type="text" id="recipeTitle" name="title" value="${item.title}" maxlength="40" required>
                </div>
                <div>
                    <label for="recipeCategory"><strong>Categorie:</strong></label>
                    <input type="text" id="recipeCategory" name="category" value="${item.category}" maxlength="40" required>
                </div>
            </section>
            <section class="form__middle">
                <div>
                    <label for="recipeIngredients"><strong>Ingrediënten (ingredient: hoeveelheid):</strong></label>
                    <textarea id="recipeIngredients" name="ingredients" required>${item.ingredients && item.ingredients.map(ingredient => `${ingredient.name}: ${ingredient.amount}`).join('\n')}</textarea>
                </div>
                <div>
                    <label for="recipeInstructions"><strong>Instructies (maximum 120 tekens):</strong></label>
                    <textarea id="recipeInstructions" name="instructions" maxlength="120" required>${item.instructions}</textarea>
                </div>
            </section>
            <section class="form__bottom">
                <div>
                    <label for="recipeCookingTime"><strong>Kooktijd (in minuten):</strong></label>
                    <input type="number" id="recipeCookingTime" name="cookingTime" value="${item.cookingTime}" required>
                </div>
                <div>
                    <label for="recipeDifficulty"><strong>Moeilijkheidsgraad:</strong></label>
                    <select id="recipeDifficulty" name="difficulty" required>
                        <option value="Gemakkelijk" ${item.difficulty === 'Gemakkelijk' ? 'selected' : ''}>Gemakkelijk</option>
                        <option value="Gemiddeld" ${item.difficulty === 'Gemiddeld' ? 'selected' : ''}>Gemiddeld</option>
                        <option value="Moeilijk" ${item.difficulty === 'Moeilijk' ? 'selected' : ''}>Moeilijk</option>
                    </select>
                </div>
                <div>
                    <label for="recipeServings"><strong>Voor hoeveel mensen:</strong></label>
                    <input type="number" id="recipeServings" name="servings" value="${item.servings}" required>
                </div>
                <button class="cta" type="submit">Aanpassen</button>
            </section>
        </form>
    </section>
    `;
}

// ---------------- RENDER RECIPES ------------------------------------------------------------------------------------------------------------------------
export function renderData($element, recipes) {
    $element.innerHTML = '';
    recipes.forEach(recipe => {
        renderRecipe($element, recipe)
    });
};

// ---------------- RENDER RANDOM RECIPES -----------------------------------------------------------------------------------------------------------------
export function renderRandomData($element, recipes, amount) {
    // Shuffle the recipes (https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/)
    const shuffledRecipes = recipes.sort(() => Math.random() - 0.5);
    // Take the first 'amount' from the shuffled recipes array
    const randomRecipes = shuffledRecipes.slice(0, amount);
    $element.innerHTML = '';
    randomRecipes.forEach(recipe => {
        renderRecipe($element, recipe)
    });
}