import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

console.log('🚀 main.tsx: Script started');

// Test 1: Check if root element exists
const rootElement = document.getElementById("root");
console.log('🚀 Root element:', rootElement ? 'FOUND' : 'NOT FOUND');

if (!rootElement) {
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1 style="color: red;">❌ ERROR: Root element not found</h1>
      <p>The div with id="root" is missing from index.html</p>
    </div>
  `;
  throw new Error('Root element not found');
}

// Test 2: Simple test component
function TestApp() {
  console.log('🚀 TestApp: Rendering');
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>✅ SUCCESS!</h1>
        <p style={{ fontSize: '24px', margin: '10px 0' }}>React is working!</p>
        <p style={{ fontSize: '16px', opacity: 0.9, margin: '20px 0' }}>
          Check browser console for more info
        </p>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p style={{ fontSize: '14px', margin: '5px 0' }}>
            ✅ Vite is serving files<br/>
            ✅ React is rendering<br/>
            ✅ CSS is loading<br/>
          </p>
        </div>
      </div>
    </div>
  );
}

// Test 3: Try to render
try {
  console.log('🚀 main.tsx: Creating root and rendering...');
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <TestApp />
    </StrictMode>
  );
  console.log('🚀 main.tsx: Render complete!');
} catch (error) {
  console.error('❌ Render error:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: sans-serif; background: #fee; min-height: 100vh;">
      <h1 style="color: red;">❌ RENDER ERROR</h1>
      <pre style="background: white; padding: 15px; overflow: auto;">${error}</pre>
    </div>
  `;
}
