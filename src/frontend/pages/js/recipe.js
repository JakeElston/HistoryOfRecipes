// js/recipe.js
const recipeTitle = document.getElementById('recipeTitle');
const recipeTags = document.getElementById('recipeTags');
const recipeEssay = document.getElementById('recipeEssay');
const recipeSteps = document.getElementById('recipeSteps');

// Load selected recipe from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const recipe = JSON.parse(localStorage.getItem('selectedRecipe'));
    if (!recipe) {
        recipeTitle.textContent = 'Recipe not found';
        return;
    }

    recipeTitle.textContent = recipe.name;
    recipeTags.textContent = 'Tags: ' + (recipe.tags || []).join(', ');

    if (recipe.essay) {
        const p = document.createElement('p');
        p.textContent = recipe.essay;
        recipeEssay.appendChild(p);
    }

    if (recipe.recipe) {
        const p = document.createElement('p');
        p.textContent = recipe.recipe;
        recipeSteps.appendChild(p);
    }
});
