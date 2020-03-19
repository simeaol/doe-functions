
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/**Create default user profile when registered in the application */
export const bookItem = functions.https.onRequest(async (request, response) => { 
    console.log(JSON.stringify(request.body)); 
    const { owner, requester, postId } = request.body;
    console.log(`user ${requester} request product ${postId} from ${owner}`);

    
    //Get token to notify the owner&requester
    const querySnapshot = getToken(owner);
    const requerySnapshot = getToken(requester);

    const ownerToken = (await querySnapshot).docs.map(snap => snap.id);
    const requesterToken = (await requerySnapshot).docs.map(snap => snap.id);
    console.log(`owner token ${ownerToken}`);
    console.log(`requester token ${requesterToken}`);

    //save the intention on database
    admin.firestore()
    .collection('donations').doc('items')
    .collection('all').doc(`${postId}`)
    .update({
        requester: requester,
        last_update: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then((result) => {//send notification to owner        
        console.log(`update result sucessfull at ${result.writeTime}`);
        const message: admin.messaging.MessagingPayload ={
            notification: {
                title: 'Nova solicitação de doação',
                body: `${requester} está interessado no item ${postId} que você publicou.`,
                clickAction: 'FLUTTER_NOTIFICATION_CLICK',
                icon: 'your-icon-url',
            }
        };
        console.log(`Sending notification to owner ${owner}`);
        return admin.messaging().sendToDevice(//send notification for all devices under this profile
            ownerToken,//'registrationToken'
            message,
        );
    })
    .then(result => {//send notification to requester
        const message: admin.messaging.MessagingPayload ={
            notification: {
                title: 'Confirmação de entrega',
                body: `${requester}, sua solicitação de foi entregue ao responsável pela publicação.`,
                clickAction: 'FLUTTER_NOTIFICATION_CLICK',
                icon: 'your-icon-url',
            }
        };
        console.log(`Sending notification to requester ${requester}`);
        return admin.messaging().sendToDevice(//send notification for all devices under this profile
            requesterToken,//'registrationToken'
            message,
        );

    })
    .catch(error => console.log(`error ocurred when requested reserve. ${error}`));

});

function getToken(profile: string){
    return admin.firestore().collection('profiles')
    .doc(profile)
    .collection('tokens')
    .get();

}

export const unbookItem = functions.https.onRequest((request, context) => {
    const { owner, requester, postId } = request.body;
    console.log(`user ${requester} unreserve product ${postId} from ${owner}`);

    //save the intention on database

    return admin.firestore()
            .collection('donations').doc('items')
            .collection('all').doc(`${postId}`)
            .update({
                requester: null,
                last_update: admin.firestore.FieldValue.serverTimestamp(),
            });
});