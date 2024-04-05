import { useState } from 'react';
import './App.css';
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';


function App() {
  const [user, setUser] = useState(null)
  return (
    <>
     {!user ? <Join setUser={setUser} /> : <Chat user={user} setUser={setUser} />}
    </>
  );
}

export default App;
