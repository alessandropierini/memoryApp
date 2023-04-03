import {Router} from 'express';
import passport, {session} from 'passport'
const router = Router();

import {signIn, signUp} from '../controllers/user.controller'
import { newPhoto} from '../controllers/photo.controller'

//USUARIO

router.post('/signup', signUp)
router.post('/signin', signIn)

//POST

router.post('/newphoto', newPhoto)

export default router;