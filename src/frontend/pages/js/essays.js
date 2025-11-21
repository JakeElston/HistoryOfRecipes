async function loadEssays() {
  try {
    // FIX: Using full URL for stability (consistent with search.js)
    const response = await fetch('http://localhost:5000/essays'); 
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const essays = await response.json();

    const container = document.getElementById('recipeContainer');
    container.innerHTML = '';

    essays.forEach(essay => {
      const col = document.createElement('div');
      col.classList.add('col-lg-4', 'col-md-6', 'mb-4');

      col.innerHTML = `
        <div class="recipe-card">
          <h3 class="recipe-title">${essay.name}</h3>
          <p class="recipe-description"></p>
        </div>
      `;

      container.appendChild(col);
    });

  } catch (err) {
    console.error('Error loading essays:', err);
    // Added a friendly error message for the user
    document.getElementById('recipeContainer').innerHTML =
        '<div class="col-12"><p class="text-center text-muted">Failed to load recipes. Check your backend server (http://localhost:5000).</p></div>';
  }
}

document.addEventListener('DOMContentLoaded', loadEssays);
