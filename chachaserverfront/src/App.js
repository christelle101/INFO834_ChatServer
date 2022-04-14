import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import makeToast from "./Toaster";

import IndexPage from "./Pages/IndexPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import ChatroomPage from "./Pages/ChatroomPage";



function App() {
 const[socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:3000",{
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket connected !");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() =>{
    setupSocket();
    //eslint-disable-next-line
  }, []);
  
  return (
  <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element = {<IndexPage/>} 
          exact/>
        <Route 
          path="/login" 
          element = {<LoginPage setupSocket={setupSocket}/>}
          exact/>
        <Route 
          path="/register" 
          element = {<RegisterPage/>}
          exact/>
        <Route 
          path="/dashboard" 
          element = {<DashboardPage socket={socket}/>}
          exact/>
        <Route 
          path="/chatroom/:id"
          element = {<ChatroomPage socket={socket}/>}
          exact />
      </Routes>
  </BrowserRouter>
  );
}


export default App;
