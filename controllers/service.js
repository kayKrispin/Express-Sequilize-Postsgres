const Service = require('../models').Service;

module.exports = {

  list(req, res) {
    return Service
      .findAll()
      .then((forums) => res.status(200).send(forums))
      .catch((error) => { res.status(400).send(error); });
  },


  create(req, res) {
    return Service
      .create({
        date: req.body.date,
        service: req.body.service,
        email: req.body.email,
        phone: req.body.phone,
        instagramName: req.body.instagramName,
      })
      .then((profile) => res.status(201).send(profile))
      .catch((error) => res.status(400).send(error));
  }

};
