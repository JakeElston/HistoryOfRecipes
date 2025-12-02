// js/recipe.js

// 1. Get Elements
const recipeTitle = document.getElementById('recipeTitle');
const recipeTags = document.getElementById('recipeTags');
const recipeEssay = document.getElementById('recipeEssay');
const recipeSteps = document.getElementById('recipeSteps');
const recipeAuthor = document.getElementById('recipeAuthor');

// Tab Elements
const tabEssayBtn = document.getElementById("tabEssayBtn");
const tabRecipeBtn = document.getElementById("tabRecipeBtn");
const essayTab = document.getElementById("essayTab");
const recipeTab = document.getElementById("recipeTab");

// 2. Tab Logic
function setupTabs() {
    if (!tabEssayBtn || !tabRecipeBtn) return;

    tabEssayBtn.addEventListener("click", () => {
        tabEssayBtn.classList.add("active", "btn-secondary");
        tabEssayBtn.classList.remove("btn-outline-secondary");
        tabRecipeBtn.classList.remove("active", "btn-secondary");
        tabRecipeBtn.classList.add("btn-outline-secondary");
        essayTab.classList.remove("d-none");
        recipeTab.classList.add("d-none");
    });

    tabRecipeBtn.addEventListener("click", () => {
        tabRecipeBtn.classList.add("active", "btn-secondary");
        tabRecipeBtn.classList.remove("btn-outline-secondary");
        tabEssayBtn.classList.remove("active", "btn-secondary");
        tabEssayBtn.classList.add("btn-outline-secondary");
        recipeTab.classList.remove("d-none");
        essayTab.classList.add("d-none");
    });
}

// 3. Render Logic
function renderData(data) {
    // Title
    if (recipeTitle) recipeTitle.textContent = data.name;

    if (recipeAuthor) recipeAuthor.textContent = data.author ? `by ${data.author}` : 'by Unknown';

    // Tags
    if (recipeTags) recipeTags.textContent = data.tags ? `Tags: ${data.tags}` : 'Tags: None';

    // Essay
    if (recipeEssay && data.essay) {
        recipeEssay.innerHTML = `<p>${data.essay}</p>`;
    }

    // Recipe / Instructions
    // We check for 'recipie' because that is how it is spelled in your Mongo screenshot
    const instructions = data.recipie || data.recipe;
    
    if (recipeSteps && instructions) {
        // Replace newlines with breaks so it looks nice
        recipeSteps.innerHTML = `<p>${instructions.replace(/\n/g, '<br>')}</p>`;
    } else if (recipeSteps) {
        recipeSteps.innerHTML = "<p>No instructions found.</p>";
    }
}

// 4. Main Execution
document.addEventListener('DOMContentLoaded', async () => {
    setupTabs();

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        if (recipeTitle) recipeTitle.textContent = "No ID provided in URL";
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/essays/${id}`);

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received from DB:", data); // Check your browser console for this!
        renderData(data);

    } catch (error) {
        console.error("Fetch error:", error);
        if (recipeTitle) recipeTitle.textContent = "Error loading data. Check Console (F12).";
    }
});