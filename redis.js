var redis = require('redis');

var client = redis.createClient();

//La base de données est nettoyée à chaque fois que le serveur est démarré
client.del("users")

//Procédé en cas d'erreur
client.on('connect', function(){
    console.error(error);
});

//Connexion à Redis
client.on('connect', function(){
    console.log('Connexion à Redis établie.');
});  

//Un utilisateur est ajouté à 'users' lorsque qu'il/elle se connecte
function add_user(username){
    client.SADD(['users', username], function(err, reply){
        return (reply);
    });
}

//Un utilisateur est supprimé du set 'users'
function remove_user(username){
    client.SREM(['users', username], function(err, reply){
        return(reply);
    })
}

//On récupère tous les utilisateurs du set 'users'
function get_users(fn){
    client.SMEMBERS('users', function(err, reply){
        fn(reply);
    })
}

module.exports = {
    add_user: add_user,
    remove_user: remove_user,
    get_users: get_users 
}