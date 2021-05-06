import express from 'express';
import {login,signUp} from '../controllers/user.js';

const Router=express.Router();

Router.post('/login',login);
Router.post('/sign-up',signUp);

export default Router;