const path = require('path');

const cartController = {

  // méthode pour afficher le panier
  cartPage: (request, response) => {
    response.render('panier');
  }

};


module.exports = cartController;
