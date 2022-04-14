const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (req, res) => {
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
    if(!nameRegex.test(name)) throw "Le nom du Chatroom ne contient que des lettres alphabétiques.";
    
    //Verify if a chatroom already exists
    const chatroomExists = await Chatroom.findOne({name});
    if(chatroomExists) throw "Un Chatroom avec ce nom existe déjà !";

    const chatroom = new Chatroom({
        name,
    });

    await chatroom.save();

    res.json({
        message: "Chatroom créé !",
    });
};

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});
  
    res.json(chatrooms);
  };