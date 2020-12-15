
const dataMapper = require('../dataMapper');

const cartController = {

  // méthode pour afficher le panier
  cartPage: (request, response) => {

    let totalHT = 0;
    for (let figurine of request.session.cart) {
      totalHT += figurine.price * figurine.quantity;
    }

    let shipping = 9.99;
    if (totalHT > 100 || totalHT === 0) {
      shipping = 0;
    }
    
    totalHT += shipping;

    let tva = totalHT * 0.2;

    response.render('panier', {cart: request.session.cart,
      totals : {
        totalHT: totalHT.toFixed(2),
        tva: tva.toFixed(2),
        totalTTC: totalHT + tva,
        shipping: shipping.toFixed(2)
      }
    });
  },

  // route : /cart/add/:id 
  addToCart: (request, response) => {
    // Aller chercher la figurine
    const figId = parseInt(request.params.id, 10); //converti en entier le params.id

    dataMapper.getOneFigurine(figId, (err, figurine) => {
      if (err) {
        console.log(err);
        response.status(500).send('erreur bdd');
        return;
      }

      // si une figurine est bien recupere par la requete, ...
      if (figurine) { 

        // inCart represente l'eventuelle figurine deja presente dans panier
        const inCart = request.session.cart.find
        (figurineDansLePanier => figurineDansLePanier.id === figurine.id);

        // Verification si figurine n'est pas dans le panier
        if (!inCart) {
            // La figurine est push dans la session (panier)
            request.session.cart.push({...figurine, quantity: 1});
          } else {
            // si elle existe deja dans le panier
             inCart.quantity++; // incart contient l'objet trouve
          }

        console.log(request.session.cart);
        // L'utilisateur est rediriger vers page panier
        response.redirect('/cart');
      } else {
        // Erreur 404 si pas de figurines
        response.status(404).send('Pas de figurine');
      }
    });   
  },

  // route : /cart/remove/:id 
  removeFromCart: (request, response) => {
    // Aller chercher la figurine
    const figId = parseInt(request.params.id, 10); //converti en entier le params.id

    dataMapper.getOneFigurine(figId, (err, figurine) => {
      if (err) {
        console.log(err);
        response.status(500).send('erreur bdd');
        return;
      }

      // si une figurine est bien recupere par la requete, ...
      if (figurine) { 

        // inCart represente l'eventuelle figurine deja presente dans panier
        const inCart = request.session.cart.find
        (figurineDansLePanier => figurineDansLePanier.id === figurine.id);

        // Verification si figurine est dans le panier
        if (inCart) {
            // si dans le panier, on decremente 
            if (inCart.quantity > 1) {
              inCart.quantity--;
            } else {
              request.session.cart = request.session.cart.filter
              (figurineDansLePanier => figurineDansLePanier.id !== inCart.id)
            }
          
          } 

        console.log(request.session.cart);
        // L'utilisateur est rediriger vers page panier
        response.redirect('/cart');
      } else {
        // Erreur 404 si pas de figurines
        response.status(404).send('Pas de figurine');
      }
    }); 
  }

};


module.exports = cartController;
