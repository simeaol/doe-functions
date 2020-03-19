import * as admin from 'firebase-admin';

admin.initializeApp();//initialize firebase admin

export const onUserRegistration = user.onUserRegistration;

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