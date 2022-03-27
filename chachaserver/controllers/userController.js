const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async(req, res) => {
    const { username, password } = req.body;

    //Verify password
    if(password.length < 6) throw "Votre mot de passe doit faire au plus 6 caractères";

    // Verify if user already exists
    const userExists = await User.findOne({
        username,
        });
    if(userExists) throw "Le nom d'utilisateur est déjà utilisé";

    //Register a new user
    const user = new User({ 
        username, 
        password: sha256(password + process.env.SALT),
    });

    await user.save();

    res.json({
        message: "User [" + username + "] a été enregistré avec succès !",
    });
};

exports.login = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        username,
        password: sha256(password + process.env.SALT),
        });
    if(!user) throw "Le nom d'utilisateur et le mot de passe sont introuvables...";

    const token = await jwt.sign({ id: user.id}, process.env.SECRET);

    res.json({
        message: "Connexion réussie !",
        token,
    });
};