var express = require('express');
var router = express.Router();
const userController = require('../controllers').user;
const profileController = require('../controllers').profile;
const bookController = require('../controllers').book;
const roleController = require('../controllers').role;
const forumController = require('../controllers').forum;
const topicController = require('../controllers').topic;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User Router */
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.post('/api/user/:id', userController.addBooks);


/* Profile Router */
router.get('/api/profile', profileController.list);
router.get('/api/profile/:id', profileController.getById);
router.post('/api/profile', profileController.add);

/* Book Router */
router.get('/api/book', bookController.list);
router.get('/api/book/:id', bookController.getById);
router.post('/api/book', bookController.add);


/* Role Router */
router.get('/api/role', roleController.list);
router.get('/api/role/:id', roleController.getById);
router.post('/api/role', roleController.add);


/* Forum Router */
router.get('/api/forum', forumController.list);
router.get('/api/forum/:id', forumController.getById);
router.post('/api/forum', forumController.add);


/* Topics Router */
router.get('/api/topic', topicController.list);
router.get('/api/topic/:id', topicController.getById);
router.post('/api/topic', topicController.add);


module.exports = router;
