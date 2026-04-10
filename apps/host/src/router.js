import Navigo from 'navigo';

export const router = new Navigo('/', { hash: false });

export function setupRoutes(container) {
  router
    .on('/', () => {
      // Clean up any mounted remote apps
      if (container.__currentApp) {
        container.__currentApp.unmount?.(container);
        container.__currentApp = null;
      }
      container.innerHTML = `<h2>Home</h2><p>Welcome to the Vanilla JS Host.</p>`;
    })
    .on('/app-a', async () => {
      // Clean up any previously mounted app
      if (container.__currentApp) {
        container.__currentApp.unmount?.(container);
        container.__currentApp = null;
      }
      container.innerHTML = `<h2>App A (budgT)</h2><p>Loading...</p>`;
      try {
        const app = await import('budgT/app');
        container.__currentApp = app;
        app.mount(container);
      } catch (err) {
        container.innerHTML = `<p style="color:red">Error loading App A: ${err.message}</p>`;
      }
    })
    .on('/app-b', async () => {
      // Clean up any previously mounted app
      if (container.__currentApp) {
        container.__currentApp.unmount?.(container);
        container.__currentApp = null;
      }
      container.innerHTML = `<h2>App B (splittR)</h2><p>Loading...</p>`;
      try {
        const app = await import('splittR/app');
        container.__currentApp = app;
        app.mount(container);
      } catch (err) {
        container.innerHTML = `<p style="color:red">Error loading App B: ${err.message}</p>`;
      }
    })
    .notFound(() => {
      container.innerHTML = `<h2>404</h2><p>Page not found</p>`;
    });
}
