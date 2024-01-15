// ---------------- RENDER ONE RECIPE ---------------------------------------------------------------------------------------------------------------------
function renderItemContent(item) {
    return `
    <article>
        <h3>${item.title}</h3>
        <p><strong>🤔  Wat heb je nodig?</strong></p>
        <ul>
        ${item.ingredients.map(ingredient => `<li>${ingredient.name}: ${ingredient.amount}</li>`).join('\n')}
        </ul>
        <p><strong>👨‍👩‍👧‍👦  Voor hoeveel mensen?</strong></p>
        <p>${item.servings}</p>
        <p><strong>📖  Instructies:</strong></p>
        <p>${item.instructions}</p>
    </article>
    `
}

function renderItem($element, item) {
    $element.innerHTML += `
    <a href="./detail.html?id=${item.id}" class="recipe__inner">
        ${renderItemContent(item)}
    </a>
    `;
};

// ---------------- RENDER DETAIL RECIPE ------------------------------------------------------------------------------------------------------------------
export function renderDetailItem($element, item) {
    $element.innerHTML = '';
    $element.innerHTML += `
    <div class="recipe__inner">
        ${renderItemContent(item)}
    </div>
    `;
};

// ---------------- RENDER DETAIL RECIPE FORM -------------------------------------------------------------------------------------------------------------
export function renderEditDetailForm($element, item) {
    $element.innerHTML = '';
    $element.innerHTML = `
    <form id="editRecipe">
        <button type="submit">Aanpassingen bevestigen</button>
        <label for="recipeTitle"><strong>Naam recept:</strong></label>
        <input type="text" id="recipeTitle" name="title" value="${item.title}" maxlength="50" required>
        <label for="recipeCategory"><strong>Categorie:</strong></label>
        <input type="text" id="recipeCategory" name="category" value="${item.category}" maxlength="40" required>
        <label for="recipeIngredients"><strong>Ingrediënten (ingredient, hoeveelheid):</strong></label>
        <textarea id="recipeIngredients" name="ingredients" required>${item.ingredients && item.ingredients.map(ingredient => `${ingredient.name}, ${ingredient.amount}`).join('\n')}</textarea>
        <label for="recipeInstructions"><strong>Instructies (maximum 200 tekens):</strong></label>
        <textarea id="recipeInstructions" name="instructions" maxlength="200" required>${item.instructions}</textarea>
        <label for="recipeCookingTime"><strong>Kooktijd (in minuten):</strong></label>
        <input type="number" id="recipeCookingTime" name="cookingTime" value="${item.cookingTime}" required>
        <label for="recipeDifficulty">Moeilijkheidsgraad:</label>
        <select id="recipeDifficulty" name="difficulty" required>
            <option value="Gemakkelijk" ${item.difficulty === 'Gemakkelijk' ? 'selected' : ''}>Gemakkelijk</option>
            <option value="Gemiddeld" ${item.difficulty === 'Gemiddeld' ? 'selected' : ''}>Gemiddeld</option>
            <option value="Moeilijk" ${item.difficulty === 'Moeilijk' ? 'selected' : ''}>Moeilijk</option>
        </select>
        <label for="recipeServings"><strong>Voor hoeveel mensen:</strong></label>
        <input type="number" id="recipeServings" name="servings" value="${item.servings}" required>
    </form>
    <a href="./detail.html?id=${item.id}">Terruggaan</a>
    `;
}

// ---------------- RENDER RECIPES ------------------------------------------------------------------------------------------------------------------------
export function renderData($element, data) {
    $element.innerHTML = '';
    data.forEach(item => {
        renderItem($element, item)
    });
};