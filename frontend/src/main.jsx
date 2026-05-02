import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress THREE.Clock deprecation warning from @react-three/fiber internals.
// THREE.Clock was deprecated in r168; pinning three@0.167.x is the real fix,
// but this guard prevents noise if a transitive dep still pulls a newer copy.
const _warn = console.warn.bind(console);
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
  _warn(...args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
