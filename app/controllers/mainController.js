const path = require('path');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (request, response) => {
    response.render('accueil');
  },

  // méthode pour la page article
  articlePage: (request, response) => {
    response.render('article');
  }

};


module.exports = mainController;
