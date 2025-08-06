async function loadProjects() {
  try {
    const response = await fetch('https://api.github.com/users/mraeesha/repos?per_page=100');
    const repos = await response.json();
    const container = document.getElementById('projects');

    repos
      .filter(repo => repo.name !== 'portfolio')
      .forEach(repo => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description provided.'}</p>
          <a href="${repo.html_url}" target="_blank" rel="noopener">View on GitHub</a>
        `;
        container.appendChild(card);
      });
  } catch (err) {
    console.error('Failed to load projects', err);
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);
