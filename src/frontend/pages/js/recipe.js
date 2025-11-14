// pages/js/recipe.js
const params = new URLSearchParams(window.location.search);
const recipeName = params.get("name");

const titleEl = document.getElementById("recipeTitle");
const tagsEl = document.getElementById("recipeTags");
const essayEl = document.getElementById("recipeEssay");
const stepsEl = document.getElementById("recipeSteps");
const errorEl = document.getElementById("errorMessage");

if (!recipeName) {
  showError("No recipe name provided.");
} else {
  fetch(`http://localhost:5000/essays`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch data from backend");
      return res.json();
    })
    .then(data => {
      const recipe = data.find(
        item => item.name.toLowerCase().trim() === recipeName.toLowerCase().trim()
      );

      if (!recipe) {
        showError("Recipe not found.");
        return;
      }

      titleEl.textContent = recipe.name;
      tagsEl.textContent = recipe.tags || "";

      // Essay tab
      essayEl.textContent = recipe.essay || "No essay available.";

      // Recipe tab
      stepsEl.textContent = recipe.recipie || recipe.recipe || "No recipe steps available.";
    })
    .catch(err => {
      showError("Error fetching recipe data: " + err.message);
    });
}

// Tab switching
const tabEssayBtn = document.getElementById("tabEssayBtn");
const tabRecipeBtn = document.getElementById("tabRecipeBtn");
const essayTab = document.getElementById("essayTab");
const recipeTab = document.getElementById("recipeTab");

tabEssayBtn.addEventListener("click", () => {
  tabEssayBtn.classList.add("active");
  tabRecipeBtn.classList.remove("active");
  essayTab.classList.remove("d-none");
  recipeTab.classList.add("d-none");
});

tabRecipeBtn.addEventListener("click", () => {
  tabRecipeBtn.classList.add("active");
  tabEssayBtn.classList.remove("active");
  recipeTab.classList.remove("d-none");
  essayTab.classList.add("d-none");
});

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove("d-none");
}
