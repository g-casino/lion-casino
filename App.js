import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Navbar user={user} />
      {!user ? (
        <>
          <Login setUser={setUser} />
          <Signup />
        </>
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;
