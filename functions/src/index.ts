
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();//initialize firebase admin

/**Create default user profile when registered in the application */
export const onUserRegister = functions.auth.user().onCreate((user) => {

    const email = user.email;
    const displayName = user.displayName;
    const uid = user.uid;

    console.log(`new user registerd: ${user.displayName} < ${user.email} >`);

    return admin.firestore().collection('profiles')
    .doc(`${email}`)
    .set({
        uid: uid,
        email: email,
        display_name: displayName,
        city: null,
        country: 'Brasil',
        last_update: Date.now(),
    });

    //console.log(`Profile registered on profiles collection at ${result.writeTime}`);


});