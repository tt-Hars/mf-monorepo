import Navigo from 'navigo';

export const router = new Navigo('/', { hash: false });

export function setupRoutes(container) {
  router
    .on('/', () => {
      container.innerHTML = `<h2>Home</h2><p>Welcome to the Vanilla JS Host.</p>`;
    })
    .on('app-a', async () => {
      container.innerHTML = `<h2>App A (budgT)</h2><p>Loading...</p>`;
      try {
        const { mount } = await import('budgT/app');
        mount(container);
      } catch (err) {
        container.innerHTML = `<p style="color:red">Error loading App A: ${err.message}</p>`;
      }
    })
    .on('app-b', async () => {
      container.innerHTML = `<h2>App B (splittR)</h2><p>Loading...</p>`;
      try {
        const { mount } = await import('splittR/app');
        mount(container);
      } catch (err) {
        container.innerHTML = `<p style="color:red">Error loading App B: ${err.message}</p>`;
      }
    });

  router.resolve();
}
