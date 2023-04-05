import {Router} from 'express';
import passport, {session} from 'passport'
const router = Router();

import {signIn, signUp, SearchUser, DeleteUser, EditUser, EditPassword, SpecificUser} from '../controllers/user.controller'
import { allPosts, newPost } from '../controllers/post.controller';

//USER

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/specificuser', SpecificUser)
router.post('/edituser', EditUser)
router.post('/editpassword', EditPassword)
router.post('/searchuser', SearchUser)
router.post('/deleteuser', DeleteUser)


//POST

router.post('/newpost', newPost)
router.post('/allposts', allPosts)

export default router;