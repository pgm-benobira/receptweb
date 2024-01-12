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

// ---------------- RENDER RECIPES ------------------------------------------------------------------------------------------------------------------------
export function renderData($element, data) {
    $element.innerHTML = '';
    data.forEach(item => {
        renderItem($element, item)
    });
};