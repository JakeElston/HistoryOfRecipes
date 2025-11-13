// js/search.js

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");

let recipes = [];

// Fetch all recipes from backend
fetch("http://localhost:5000/essays")
  .then(res => res.json())
  .then(data => {
    recipes = data;
    displayRecipes(data);
  })
  .catch(err => {
    recipeContainer.innerHTML = `<p class="text-danger">Error loading recipes: ${err.message}</p>`;
  });

// Filter as user types
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = recipes.filter(r => r.name.toLowerCase().includes(term));
  displayRecipes(filtered);
});

// Render recipes
function displayRecipes(list) {
  recipeContainer.innerHTML = "";
  if (list.length === 0) {
    recipeContainer.innerHTML = "<p class='text-muted'>No recipes found.</p>";
    return;
  }

  list.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "col-md-6 mb-3";

    card.innerHTML = `
      <div class="card p-3 shadow-sm">
        <h3>
          <a href="recipe.html?name=${encodeURIComponent(recipe.name)}">${recipe.name}</a>
        </h3>
        <p class="text-muted small">${recipe.description || ""}</p>
      </div>
    `;

    recipeContainer.appendChild(card);
  });
}
