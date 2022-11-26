const express = require('express');

const auth = require('../../middlewares/auth');
const upload = require('../../middlewares/storage');
const jsonify = require('../../middlewares/jsonify');
const validate = require('../../middlewares/validate');

const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('managePosts'),
    upload.array('media'),
    jsonify(['tags', 'tools']),
    validate(postValidation.createPost),
    postController.createPost
  )
  .get(auth('getPosts'), validate(postValidation.getPosts), postController.getPosts);

router
  .route('/:postId')
  .get(auth('getPosts'), validate(postValidation.getPost), postController.getPost)
  .patch(
    auth('managePosts'),
    upload.array('media'),
    jsonify(['tags', 'tools']),
    validate(postValidation.updatePost),
    postController.updatePost
  )
  .delete(auth('managePosts'), validate(postValidation.deletePost), postController.deletePost);

module.exports = router;
