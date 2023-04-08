import {Router} from 'express';
import passport, {session} from 'passport'
const router = Router();

import {signIn, signUp, SearchUser, DeleteUser, EditUser, EditPassword, SpecificUser, ProfilePhoto} from '../controllers/user.controller'
import { DeletePost, allPosts, newPost } from '../controllers/post.controller';
import { DeleteComment, NewComment, getComments } from '../controllers/comment.controller';
import { AddOrRemoveLike, Getlikes } from '../controllers/like.controller';
import { FolloworUnfollow, GetFollowers, GetFollowing } from '../controllers/follow.controller';
import { allStories, newStory } from '../controllers/stories.controller';

//USER

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/profilephoto', ProfilePhoto)
router.post('/specificuser', SpecificUser)
router.post('/edituser', EditUser)
router.post('/editpassword', EditPassword)
router.post('/searchuser', SearchUser)
router.post('/deleteuser', DeleteUser)


//POST

router.post('/newpost', newPost)
router.post('/allposts', allPosts)
router.post('/deletepost', DeletePost)

//COMMENTS

router.post('/newcomment', NewComment)
router.post('/getcomments', getComments)
router.post('/deletecomment', DeleteComment)

//LIKES

router.post('/like', AddOrRemoveLike)
router.post('/getlikes', Getlikes)

//FOLLOW

router.post('/follow', FolloworUnfollow)
router.post('/getfollowers', GetFollowers)
router.post('/getfollowing', GetFollowing)

//STORIES

router.post('/newstorie', newStory)
router.post('/allstories', allStories)

export default router;