import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import makeToast from '../Toaster';

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const nameRef = React.createRef();

  const getChatrooms = () => {
    axios
      .get("http://localhost:3000/chatroom", {
          headers: {
          Authorization: "Bearer" + localStorage.getItem("CC_Token"),
          },
      })
      .then((response) => {
          setChatrooms(response.data);
      })
      .catch((err) => {
          setTimeout(getChatrooms, 3000);
      });
    };

  const addChatroom = () => {
    const name = nameRef.current.value;

    axios.post("http://localhost:3000/chatroom", {
      name,
    })
    .then((response) => {
      makeToast("success", response.data.message);
      getChatrooms();
    })
    .catch((err) => {
      console.log(err);
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      )
      makeToast("error", err.response.data.message);
    });
  };
      
  React.useEffect(() => {
    getChatrooms();
      // eslint-disable-next-line
  }, []);


  return (
      <div className="card">
        <div className="cardHeader"> Chatrooms </div>
          <div className="cardBody"> 
            <div className="inputGroup">
                <label htmlFor = "chatroomName"> Chatroom Name </label>
                  <input 
                    type = "text" 
                    name="chatroomName" 
                    id="chatroomName" 
                    placeholder="ChatterBox"
                    ref = {nameRef}
    
                  />
            </div> 
          </div>
          <button onClick={addChatroom}> Créer un Chatroom </button>
          <div className="chatrooms">
            {chatrooms.map((chatroom) =>(
              <div key={chatroom._id} className="chatroom">
                <div> {chatroom.name} </div>
                <Link to={"/chatroom/" + chatroom._id}>
                  <div className="join"> Rejoindre </div>
                </Link>
              </div>
                ))}
          </div>

        </div>
        );
};
    

export default DashboardPage;
