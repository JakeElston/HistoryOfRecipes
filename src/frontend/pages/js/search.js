// js/search.js
const recipeContainer = document.getElementById('recipeContainer');
const searchInput = document.getElementById('searchInput');
let allRecipes = [];

// Fetch recipes from backend
async function loadRecipes() {
    try {
        const res = await fetch('http://localhost:5000/essays');
        allRecipes = await res.json();
        renderRecipes(allRecipes);
    } catch (err) {
        console.error('Failed to fetch recipes:', err);
    }
}

// Render cards
function renderRecipes(recipes) {
    recipeContainer.innerHTML = '';
    recipes.forEach(r => {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        
        const card = document.createElement('div');
        card.className = 'recipe-card';

        const title = document.createElement('h3');
        title.className = 'recipe-title';
        title.textContent = r.name;
        title.onclick = () => {
            localStorage.setItem('selectedRecipe', JSON.stringify(r));
            window.location.href = 'recipe.html';
        };

        const tags = document.createElement('p');
        tags.className = 'recipe-tags';
        tags.textContent = 'Tags: ' + (r.tags || []).join(', ');

        card.appendChild(title);
        card.appendChild(tags);
        col.appendChild(card);
        recipeContainer.appendChild(col);
    });
}

// Search functionality
searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allRecipes.filter(r => r.name.toLowerCase().includes(term) ||
        (r.tags || []).some(tag => tag.toLowerCase().includes(term))
    );
    renderRecipes(filtered);
});

document.addEventListener('DOMContentLoaded', loadRecipes);
