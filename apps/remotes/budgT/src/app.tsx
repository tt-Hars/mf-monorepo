import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div style={{ border: '2px solid blue', padding: '10px' }}>
      <h3>budgT (React App)</h3>
      <p>This is the React micro-frontend loaded remotely.</p>
    </div>
  );
};

export const mount = (el: any) => {
  // Reuse existing root if available, otherwise create a new one
  if (!el.__reactRoot) {
    el.__reactRoot = createRoot(el);
  }
  el.__reactRoot.render(<App />);
};

export const unmount = (el: any) => {
  if (el.__reactRoot) {
    el.__reactRoot.unmount();
    el.__reactRoot = null;
  }
};
