import admin from "../helper/firebase.js";

export async function pushNotification(req,res){
    const {title,body} = req.body;
    
    const message = {
    notification: { title, body },
    topic:'live_updates'
    // token, // device FCM token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent successfully:", response);
    res.send('succcess')
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}

//fkY3SC9nSqCWZD2phNOcYQ:APA91bHrJg2jzSI8nm3zfxv7isEMO4iHxHvx1lSY3-7Ci4DUZGbzYsQBTeFX6ZuSoJs3cG56WbnSTGJPWGT6lRf7NPtguOjom982UR0RdaW5VPHWTCH033A