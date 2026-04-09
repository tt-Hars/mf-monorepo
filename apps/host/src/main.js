import { store } from './store';
import { router, setupRoutes } from './router';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('micro-frontend-container');

  if (container) {
    setupRoutes(container);
  }

  // Update links properly using Navigo's built-in binding method
  router.updatePageLinks();
});
