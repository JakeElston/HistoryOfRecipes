// js/search.js

let allRecipes = [];
let initialRecipesLoaded = false; 

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const categoryCheckboxes = document.getElementById("categoryCheckboxes");

// Fetch ALL recipes from backend
async function fetchAllRecipes() {
  if (initialRecipesLoaded) return;

  try {
    const url = 'http://localhost:5000/essays'; // Always fetch all
    
    console.log('Fetching all recipes from:', url);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Total recipes fetched:', data.length);
    
    allRecipes = data;
    initialRecipesLoaded = true;
    applyFilters(); 
  } catch (error) {
    console.error('Error fetching recipes:', error);
    recipeContainer.innerHTML = 
      '<div class="col-12"><p class="text-center text-muted">Error loading recipes. Make sure backend is running on http://localhost:5000</p></div>';
  }
}

// Display recipes (Renders the cards)
function displayRecipes(recipes) {
  if (recipes.length === 0) {
    recipeContainer.innerHTML = '<div class="col-12"><p class="text-center text-muted">No recipes found.</p></div>';
    return;
  }

  recipeContainer.innerHTML = recipes.map(recipe => {
    // We pass the recipe._id to the global viewRecipe function
    return `
      <div class="col-md-4 mb-4">
        <!-- **UPDATED:** Passing recipe._id for reliable lookup -->
        <div class="recipe-card h-100" onclick="viewRecipe('${recipe._id}')">
          <div class="recipe-card-body d-flex flex-column" style="height: 100%;">
            <h5 class="recipe-title">${recipe.name || 'Untitled'}</h5>
            <p class="recipe-author">by ${recipe.author || 'Unknown'}</p>
            <p class="text-muted flex-grow-1" style="overflow: hidden; text-overflow: ellipsis;">${recipe.essay ? recipe.essay.substring(0, 100) + '...' : ''}</p>
            ${recipe.tags ? `<span class="recipe-tag mt-auto">${recipe.tags}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}


// Main filter function
function applyFilters() {
  let filteredRecipes = [...allRecipes];

  // 3a. Filter by Category (Multi-select)
  const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked'))
                                 .map(cb => cb.value)
                                 .filter(val => val !== ''); // Exclude "All Categories"

  if (selectedCategories.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe => {
      // Assuming recipe.tags is a string that contains the category
      const tags = recipe.tags || '';
      return selectedCategories.some(cat => tags.includes(cat));
    });
  }

  // Filter by Search Input (text)
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      (recipe.name && recipe.name.toLowerCase().includes(searchTerm)) ||
      (recipe.author && recipe.author.toLowerCase().includes(searchTerm)) ||
      (recipe.essay && recipe.essay.toLowerCase().includes(searchTerm))
    );
  }

  displayRecipes(filteredRecipes);
}

// Helper to handle the 'All Categories' checkbox logic
function handleAllCategoryToggle(event) {
    const isAll = event.target.id === 'catAll';
    const isChecked = event.target.checked;
    const allCheckboxes = document.querySelectorAll('.category-checkbox');

    if (isAll) {
        // If 'All' is checked, uncheck others.
        if (isChecked) {
            allCheckboxes.forEach(cb => {
                if (cb.id !== 'catAll') cb.checked = false;
            });
        }
    } else {
        // If any specific category is checked, uncheck 'All'.
        if (isChecked) {
            document.getElementById('catAll').checked = false;
        } else {
            // If the last specific one is unchecked, check 'All'.
            const specificChecked = Array.from(allCheckboxes).filter(cb => cb.id !== 'catAll' && cb.checked).length;
            if (specificChecked === 0) {
                document.getElementById('catAll').checked = true;
            }
        }
    }
    applyFilters();
}

// Event Listeners
searchInput.addEventListener('input', applyFilters);
categoryCheckboxes.addEventListener('change', handleAllCategoryToggle);

// Initial load
document.addEventListener('DOMContentLoaded', fetchAllRecipes);