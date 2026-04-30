import { store } from './store';
import { router, setupRoutes } from './router';

import type { AppContainer } from './router';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('micro-frontend-container') as AppContainer;

  if (container) {
    setupRoutes(container);
    router.updatePageLinks();
    router.resolve();
  }
});
