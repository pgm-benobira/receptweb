// ---------------- RENDER RECIPE -------------------------------------------------------------------------------------------------------------------------
function renderItem($element, item) {
    $element.innerHTML += `
    <a href="./detail.html?recipe=${item.title}" class="recipe__inner">
        <article>
            <h3>${item.title}</h3>
            <p><strong>🤔  What do you need?</strong></p>
            <ul>
            ${item.ingredients.map(ingredient => `<li>${ingredient.name}: ${ingredient.amount}</li>`).join('\n')}
            </ul>
            <p><strong>👨‍👩‍👧‍👦  Servings</strong></p>
            <p>${item.servings}</p>
            <p><strong>📖  Instructions</strong></p>
            <p>${item.instructions}</p>
        </article>
    </a>
    `;
};

// ---------------- RENDER RECIPES ------------------------------------------------------------------------------------------------------------------------
export function renderData($element, data) {
    $element.innerHTML = '';
    data.forEach(item => {
        renderItem($element, item)
    });
};