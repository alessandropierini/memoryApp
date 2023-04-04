import {Router} from 'express';
import passport, {session} from 'passport'
const router = Router();

import {signIn, signUp} from '../controllers/user.controller'
import { newPost } from '../controllers/post.controller';

//USER

router.post('/signup', signUp)
router.post('/signin', signIn)

//POST

router.post('/newpost', newPost)

export default router;