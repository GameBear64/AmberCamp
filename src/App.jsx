import { useState } from 'react';

import './App.scss';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p className="font-bold underline mt-10">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <span className="material-icons">home</span>
    </div>
  );
}

export default App;
