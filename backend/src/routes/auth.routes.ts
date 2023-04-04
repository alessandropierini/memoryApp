import {Router} from 'express';
import passport, {session} from 'passport'
const router = Router();

import {signIn, signUp, SearchUser} from '../controllers/user.controller'
import { newPost } from '../controllers/post.controller';

//USER

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/searchuser', SearchUser)

//POST

router.post('/newpost', newPost)

export default router;