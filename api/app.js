const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const router = require('express').Router();

const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const signupRouter = require('./controllers/signup');
const changeProfilePicRouter = require('./controllers/changeProfilePic');
const postRouter = require('./controllers/post');
const profilePostsRouter = require('./controllers/profilePosts');
const feedRouter = require('./controllers/feed');
const friendRouter = require('./controllers/friend');
const friendshipRouter = require('./controllers/friendship');

const middleware = require('./utils/middlewares');
const config = require('./utils/config');
const app = express();

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error.message));

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_KEY,
  api_secret: config.CLOUDINARY_SECRET
});

router.use(cors());

router.options('*', cors());
router.use(bodyParser.json());
router.use(morgan('tiny'));

router.use('/users', usersRouter);
router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/change-profile-pic', changeProfilePicRouter);
router.use('/post', postRouter);
router.use('/profile-posts', profilePostsRouter);
router.use('/feed', feedRouter);
router.use('/friendship', friendshipRouter);
router.use('/', friendRouter);

router.use(middleware.unknownEndpoint);
router.use(middleware.errorHandler);

app.use('/api', router)
app.listen(config.PORT, () => console.log(`Listening on port: ${config.PORT}`));

module.exports = app;
