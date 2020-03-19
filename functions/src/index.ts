import * as admin from 'firebase-admin';
import * as post from './post_functions';
import * as user from './user_handler';

admin.initializeApp();//initialize firebase admin

export const onUserRegistration = user.onUserRegistration;

export const bookItem = post.bookItem;
export const unbookItem = post.unbookItem;