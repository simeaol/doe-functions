
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**Create default user profile when registered in the application */
export const bookItem = functions.https.onRequest(async (request, response) => {  
    const { owner, requester, postId } = request.body;
    console.log(`user ${requester} request product ${postId} from ${owner}`);

    //save the intention on database

    admin.firestore()
    .collection('donations').doc('items')
    .collection('all').doc(`${postId}`)
    .update({
        requester: requester,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then((result) => {
         //send notification to owner
        console.log(`update result sucessfull at ${result.writeTime}`)
        return admin.messaging().sendToDevice(
            'registrationToken',
            {//message payload
                
            },//message options
            {

            }

        );
    })
    .catch(error => console.log('error ocurred when requested reserve'));

});

export const unbookItem = functions.https.onRequest((request, context) => {
    const { owner, requester, postId } = request.body;
    console.log(`user ${requester} unreserve product ${postId} from ${owner}`);

    //save the intention on database

    return admin.firestore()
            .collection('donations').doc('items')
            .collection('all').doc(`${postId}`)
            .update({
                requester: null,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
});