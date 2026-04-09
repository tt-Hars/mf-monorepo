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

export const mount = (el) => {
  const root = createRoot(el);
  root.render(<App />);
};
