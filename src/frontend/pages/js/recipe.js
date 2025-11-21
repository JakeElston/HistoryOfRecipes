
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

const titleEl = document.getElementById("recipeTitle");
const tagsEl = document.getElementById("recipeTags"); // Correctly named tag element
const essayEl = document.getElementById("recipeEssay");
const stepsEl = document.getElementById("recipeSteps");
const errorEl = document.getElementById("errorMessage");

// Function to display errors
function showError(msg) {
  console.error("RECIPE ERROR:", msg);
  if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.remove("d-none");
  } else {
      console.error("Error element not found, could not display message:", msg);
  }
}

// Function that handles the asynchronous fetching of recipe details
async function loadAndDisplayRecipe() {
    if (!recipeId) {
        showError("No recipe ID provided. Ensure the link from the search page includes a valid '?id=' parameter.");
        return;
    }

    try {
        const url = `http://localhost:5000/essays/${recipeId}`;
        
        console.log('Fetching recipe from:', url);
        const res = await fetch(url);

        if (res.status === 404) {
             throw new Error("Recipe not found. Check the ID.");
        }
        if (!res.ok) {
            throw new Error(`Failed to fetch recipe: HTTP status ${res.status}`);
        }
        
        const recipe = await res.json();
        
        // Populate elements
        if (titleEl) titleEl.textContent = recipe.name || "Untitled Recipe";
        if (tagsEl) tagsEl.textContent = recipe.tags || ""; // FIX: Changed tagsL to tagsEl

        // Essay tab
        if (essayEl) essayEl.textContent = recipe.essay || "No essay available.";

        // Recipe tab
        if (stepsEl) stepsEl.textContent = recipe.recipie || recipe.recipe || "No recipe steps available.";

    } catch (err) {
        showError(`Error loading recipe data: ${err.message}. Ensure your front-end is served via a local HTTP server (e.g., http://localhost:8000) and the backend is running at http://localhost:5000.`);
    }
}


// --- Tab switching logic ---
function setupTabSwitching() {
    const tabEssayBtn = document.getElementById("tabEssayBtn");
    const tabRecipeBtn = document.getElementById("tabRecipeBtn");
    const essayTab = document.getElementById("essayTab");
    const recipeTab = document.getElementById("recipeTab");

    if (tabEssayBtn && tabRecipeBtn && essayTab && recipeTab) {
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
    }
}


// Initial load and setup, running once the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadAndDisplayRecipe();
    setupTabSwitching();
});