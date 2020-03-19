import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onUserRegistration = functions.auth.user().onCreate((user) => {

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

});