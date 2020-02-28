const User = require('../models').User;
const Profile = require('../models').Profile;
const Role = require('../models').Role;
const Book = require('../models').Book;

module.exports = {
  list(req, res) {
    return User
      .findAll({attributes: ['password', 'id'],   include: [
          {
            model: Profile,
            as: 'profile',
            attributes: ['fullname']
          },   {
            model: Book,
            as: 'books',
            attributes: ['name', 'author']
          }
          ]})
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
            attributes: ['name', 'author', 'id', 'userId']
          },
          {
            model: Role,
            as: 'roles',
            attributes: ['role_name', 'id'],
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

  async addBooks(req, res) {

    const books = await Book.findAll({
      where: {
        id: [...req.body.data]
      }
    });

    books.map(async book => {
      await book.update({ userId: req.params.id })
    });

    res.send({})

  },


  async addRoles(req, res) {

    const user  = await User.findByPk(req.params.id);

    const roles = await Role.findAll({
      where: {
        id: [...req.body.data]
      }
    });

    user.addRoles(roles);

    res.send(roles)

  },

  async clearRoles(req, res) {

    const user  = await User.findByPk(req.params.id);

    user.setRoles([]);

    res.send(roles)

  },


  async createUserWithBooks(req, res) {

    const { username, password, books } = req.body;

    const userToSave = { username, password };

    if (books) userToSave.books = books;

    let user = {};

    try {

      user = await User.create(userToSave, {
        include: [
          { model: Book, as: "books" }
        ]
      })

    } catch (e) {
      throw e;
    }

    res.send(user)

  },


  update(req, res) {
    return User
      .findByPk(req.params.id, {
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
      .findByPk(req.params.id)
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
