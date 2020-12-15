const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (request, response) => {

    dataMapper.getAllFigurines((err, figurines) => {

      if (err) {
        console.log(err);
        response.status(500).send('erreur bdd');
        return;
      }

      response.render('accueil', {figurines});
    });
  },

  // méthode pour la page article
  articlePage: (request, response) => {
    const figId = parseInt(request.params.id, 10);
    
    dataMapper.getOneFigurine(figId, (err, figurine) => {

      if (err) {
        console.log(err);
        response.status(500).send('erreur bdd');
        return;
      }

      if (figurine) {
        response.render('article', {figurine});
      } else {
        response.status(404).send('Pas de figurine trouvee')
      }
    })
  }
};

module.exports = mainController;
