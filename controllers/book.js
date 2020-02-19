const Book = require('../models').Book;

module.exports = {
  list(req, res) {
    return Book
      .findAll({})
      .then((book) => res.status(200).send(book))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Book
      .findByPk(req.params.id)
      .then((profile) => {
        if (!profile) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return res.status(200).send(profile);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Book
      .bulkCreate([
      {name: 'Song of ice and flames', author: 'George Martin', userId: 3},
      {name: 'Lord of the rings', author: "John Tolkien", userId: 3},
      {name: 'Wheel of time', author: 'Robert Gordan', userId: 3}
    ])
      .then((books) => res.status(200).send(books))
      .catch((error) => res.status(400).send(error));
  },
};
