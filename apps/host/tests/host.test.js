import { describe, it, expect, beforeEach } from 'vitest';
import { store, login, logout } from '../src/store';
import { router, setupRoutes } from '../src/router';

describe('Host Application', () => {
  describe('Navigo Router', () => {
    let container;

    beforeEach(() => {
      document.body.innerHTML = '<div id="micro-frontend-container"></div>';
      container = document.getElementById('micro-frontend-container');
      setupRoutes(container);
    });

    it('should render Home route', async () => {
      router.navigate('/');
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(container.innerHTML).toContain('Welcome to the Vanilla JS Host');
    });

    it('should render App A loading state initially', async () => {
      router.navigate('app-a');
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(container.innerHTML).toContain('App A (budgT)');
    });

    it('should render App B loading state initially', async () => {
      router.navigate('app-b');
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(container.innerHTML).toContain('splittR (Angular App Placeholder)');
    });
  });
});
