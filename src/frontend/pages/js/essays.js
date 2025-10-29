// public/scripts/essays.js
async function loadEssays() {
  try {
    const response = await fetch('/essays');
    const essays = await response.json();

    const container = document.getElementById('recipeContainer');
    container.innerHTML = '';

    essays.forEach(essay => {
      const col = document.createElement('div');
      col.classList.add('col-lg-4', 'col-md-6', 'mb-4');

      col.innerHTML = `
        <div class="recipe-card">
          <h3 class="recipe-title">${essay.name}</h3>
          <p class="recipe-description"></p> <!-- Leave description blank for now -->
        </div>
      `;

      container.appendChild(col);
    });

  } catch (err) {
    console.error('Error loading essays:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadEssays);
