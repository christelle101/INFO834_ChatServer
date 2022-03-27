const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Setup cross origine
app.use(require("cors")());


//Retrieve the routes
app.use("/user",require("./routes/user"));
app.use("/chatroom",require("./routes/chatroom"));


//Setup Error Handlers
const errorsHandlers = require("./handlers/errorHandlers");
app.use(errorsHandlers.notFound);
app.use(errorsHandlers.mongoseErrors);
if(process.env.ENV === "DEVELOPMENT"){
    app.use(errorsHandlers.developmentErrors);
} else {
    app.use(errorsHandlers.productionErrors);
}

module.exports = app;