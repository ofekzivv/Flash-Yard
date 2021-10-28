const functions = require('firebase-functions')
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp()
require('dotenv').config()
const db = admin.firestore();

exports.sendEmailNotification = functions.firestore.document('orders/{docId}')
  .onCreate((snap, ctx) => {
    const data = snap.data();
    let authData = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'dlevy28@gmail.com',
        pass: 'iydsn2803',
      }
    });
    authData.sendMail({
      from: 'dlevy28@gmail.com',
      to: `dlevy28@gmail.com`,
      subject: 'Your submission Info',
      text: `${data.email}`,
      html: `${data.email}`,
    }).then(res => console.log('successfully sent that mail', `${data.email}`)).catch(err => console.log(err));

  });

exports.writeToFirestore = functions.firestore.document('orders/{docId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    if (newValue.paymant === true && previousValue.paymant === false) {
      //console.log(newValue, 'newValue');
      // console.log(previousValue, 'previousValue');

      const usersRef = db.collection('users');
      const snapshot = await usersRef.where('id', 'in', [newValue.uidChef,newValue.uidClint]).get();
      let chefUser;
      if (!snapshot[0]) {
        console.log('No matching documents.');
        return;
      }
      snapshot.forEach(doc => {
        if (newValue.uidChef === doc.id) {
           chefUser = doc.data();
          console.log(chefUser);
          this.sendEmailNotification()
        }

      });


    } else {
      console.log('לא בוצע שינוי')
    }


  });
