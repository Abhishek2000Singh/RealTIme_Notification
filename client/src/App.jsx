import './App.css';
import { useEffect, useState } from 'react';
import { Card, Navbar } from './components/indexComp';
import { posts } from "./data"
import { io } from "socket.io-client";

export default function App() {

  const [username, setUsername] = useState("")
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])

  console.log(user);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (

        <div className="login">
          <input
            type="text"
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="loginBtn" onClick={() => setUser(username)} >Login</button>
        </div>
      )}
    </div>
  );
}

