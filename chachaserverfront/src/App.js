import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage";
import IndexPage from './Pages/IndexPage';
import ChatroomPage from './Pages/ChatroomPage';
import io from "socket.io-client";
import makeToast from './Toaster';

//
//<Route path="/" element = {<IndexPage exact/>}/>

function App() {
  const[socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_TOKEN");
    if (token && !socket) {
      const newSocket = io("http://localhost:3000",{
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout("error", 3000);
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
        <Route path="/" element = {<IndexPage/>} exact/>
        <Route 
          path="/login" 
          render = {() => <LoginPage setupSocket = {setupSocket} />}
          exact/>
        <Route path="/register" element = {<RegisterPage />} exact/>
        <Route 
          path="/dashboard" 
          render = {() => <DashboardPage socket = {socket} />} 
          exact/>
        <Route 
          path="/chatroom/:id" 
          render = {() => <ChatroomPage socket = {socket} />}
          exact/>
      </Routes>
  </BrowserRouter>
  );
}


export default App;
