// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

// on importe express-session
const session = require('express-session');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

// On utilise le middleware session
app.use(session({
  secret: 'ij2020ofig', // secret key
  resave: false, 
  saveUninitialized: true,
  cookie: {
    secure: false, // pour https
    maxAge: (1000*60*60) // 2 semaines
  }
}));

// Middlwere qui verifie systematiquement que le panier existe a chaque requetes
app.use((req, res, next) => {
  // Si le tableau (le pannier) n'existe pas
  if (!req.session.cart) { 
    // le tableau est cree (vide)
    req.session.cart = [] 
  }
  next();
})


app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.set('promo', 'Iliade');

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
