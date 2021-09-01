import FBI from '../../middleware/firebase'
import firestore from "firebase";


//FBI.DB() point to => firebase.firestore()

async function createYard(options) {
  const eventRef = FBI.DB().collection('yards').doc()
  const id = eventRef.id;
  eventRef.set(options).then(r=> {
    console.log(r)
  })

  // await eventRef.set(options).then(()=> {
  //   const userRef = db.collection(`users`).doc(`${window.user.uid}`)
  //   userRef.collection('myEventsId').doc(id).set({})
  // })
}

async function uploadYardsImages(option){
   console.log("option from upload",option)

  debugger
  const storage = FBI.firebase.storage()
  // const yardsRef = storage.ref(`yardsImages/ ${user.uid}`);
  const yardsRef = storage.ref(`yardsImages/ ${Math.random()}`);
  const yardFolder = yardsRef.child(`${Math.random()}`);

  const urlArr = []
  for (const image of option.images) {
    console.log(`image`,image)
    return yardFolder.put(image).then(() => {
      return yardFolder.getDownloadURL().then((url) => {
        urlArr.push(url)
        return urlArr;
      })
    });
  }



}



export default {
  createYard,
   uploadYardsImages
}
