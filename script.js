const projectInfo = {
  'E-Commerce-Supply-Chain-Dashboard': {
    description:
      'Built a Tableau dashboard using SQL and Python to analyze delivery inefficiencies. Visualized KPIs like processing time, late deliveries and returns to support data-driven decisions.',
  },
  'AirCab-eVTOL-Project': {
    description:
      'Led full-lifecycle aerospace systems engineering for an electric VTOL aircraft. Deliverables include a $67M production plan, system architecture and risk analysis for Uber.',
  },
  'Customer-Segment-Analysis-Power-BI': {
    description:
      'Created an interactive Power BI report using RFM metrics to segment customers. Applied DAX, Power Query and star-schema modeling to analyze behavior and demographics.',
  },
  'Product-Strategy-for-PAL': {
    description:
      'Defined product vision and go-to-market plan for a smart home assistant. Covered AI features, 5C marketing, risk management, and strategies for personalization and wellness.',
  },
  'Exploratory-Analysis-for-origin-of-wine': {
    description:
      'Used EDA to identify key chemical features predicting wine origin. Found alcohol concentration most predictive, followed by color intensity.',
    displayName: 'Exploratory-Analysis-for-origin-of-wine-using-R',
    hideLanguage: true,
  },
  'NVIDIA-Financial-Forecasting': {
    description:
      'Analyzed NVIDIA’s financials (2014–2023) using Excel dashboards, pivot tables and VBA. Built a time-series model and evaluated risks and industry context.',
  },
  'Best-City-to-Live-Dashboard': {
    description:
      'Developed an Excel tool to rank U.S. cities by livability. Included custom scoring, filters and dynamic charts with VBA automation.',
  },
  'Bike-Demand-Forecasting': {
    description:
      'Built predictive models in R to forecast bike rentals. Random forest achieved 85.88% adjusted R², with hour, temperature and weekday as top predictors.',
  },
};

async function loadProjects() {
  try {
    const response = await fetch('https://api.github.com/users/mraeesha/repos?per_page=100');
    const repos = await response.json();
    const container = document.getElementById('projects');

    repos
      .filter(repo => repo.name !== 'portfolio')
      .forEach(repo => {
        const info = projectInfo[repo.name] || {};
        const name = info.displayName || repo.name;
        const tagHtml = info.hideLanguage
          ? ''
          : repo.language
              ? `<span class="tag">${repo.language}</span>`
              : '';
          const card = document.createElement('div');
          card.className = 'project-card';
          const rawDescription = info.description || repo.description;
          const description =
            rawDescription && rawDescription !== 'No description provided.'
              ? rawDescription
              : '';
          const descriptionHtml = description ? `<p>${description}</p>` : '';
          card.innerHTML = `
            <h3>${name}</h3>
            ${tagHtml}
            ${descriptionHtml}
            <a href="${repo.html_url}" target="_blank" rel="noopener" class="btn">View on GitHub</a>
          `;
        container.appendChild(card);
      });
  } catch (err) {
    console.error('Failed to load projects', err);
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);
