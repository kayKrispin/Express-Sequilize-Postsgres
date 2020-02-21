const User = require('../models').User;
const Profile = require('../models').Profile;
const Role = require('../models').Role;
const Book = require('../models').Book;

module.exports = {
  list(req, res) {
    return User
      .findAll({attributes: ['password']})
      .then((users) => res.status(200).send(users))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return User.findByPk(req.params.id, {
      attributes: ['password'],
      include: [
          {
            model: Profile,
            as: 'profile',
            attributes: ['fullname']
          },
          {
            model: Book,
            as: 'books',
            attributes: ['name', 'author']
          },
          {
            model: Role,
            as: 'roles',
            attributes: ['role_name'],
            required: false,
            through: { attributes: [] }
          }],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return User
      .create({
        username: req.body.username,
        password: req.body.password
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.id, {
        include: [{
          model: Profile,
          as: 'profile'
        },
          {
            model: Role,
            as: 'roles'
          }],
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            username: req.body.username || user.username,
            password: req.body.password || user.password,
          })
          .then(() => res.status(200).send(user))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return User
      .findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
