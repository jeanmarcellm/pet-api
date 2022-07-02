/* eslint-disable prettier/prettier */
import { Router } from 'express';
require('dotenv/config');
const asyncHandler = require('express-async-handler');

import UserController from './app/controllers/UserController';
import ImageController from './app/controllers/ImageController';
import Auth from './app/middlewares/auth';

const routes = new Router();

// Image
routes.get('/image/:image_id', asyncHandler(ImageController.show));

// User
routes.get('/user', Auth.verify, asyncHandler(UserController.find));
routes.get('/user/list', asyncHandler(UserController.index));
routes.post('/user/sign_in', asyncHandler(UserController.signIn));
routes.post('/user/login', asyncHandler(UserController.signIn));
routes.get('/user/user-types', Auth.verify, asyncHandler(UserController.userTypes));
routes.post('/user', asyncHandler(UserController.store));
routes.get('/user/:user_id', asyncHandler(UserController.find));
routes.put('/user/:user_id', asyncHandler(UserController.update));
routes.delete('/user/bulk', Auth.verify, asyncHandler(UserController.bulkDestroy));
routes.delete('/user/:user_id', Auth.verify, asyncHandler(UserController.destroy));


// FAQ
// routes.get('/faq', asyncHandler(FaqController.index));
// routes.post('/faq', Auth.verify, asyncHandler(FaqController.store));
// routes.get('/faq/:faq_id', asyncHandler(FaqController.find));
// routes.put('/faq/:faq_id', Auth.verify, asyncHandler(FaqController.update));
// routes.delete('/faq/bulk', Auth.verify, asyncHandler(FaqController.bulkDestroy));

export default routes;
