import FBI from '../../middleware/firebase'
// import firestore from "firebase";


//FBI.DB() point to => firebase.firestore()

function createUser(data) {
  return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
}


async function createYard(options) {
  const eventRef = FBI.DB().collection('yards').doc()
  const id = eventRef.id;
  // options.chef = window.user.uid
  eventRef.set(options).then(r=> {
    console.log(r)
  })

  // await eventRef.set(options).then(()=> {
  //   const userRef = db.collection(`users`).doc(`${window.user.uid}`)
  //   userRef.collection('myEventsId').doc(id).set({})
  // })
}

async function uploadYardsImages(option){
  console.log("option from upload", option)
  const storage = FBI.firebase.storage()
  // const yardsRef = storage.ref(`yardsImages/ ${user.uid}`);
  const yardsRef = storage.ref(`yardsImages/ ${Math.random()}`);


  const urlArr = []
  for (const image of option.images) {
    const yardFolder = yardsRef.child(`${Math.random()}`);
    console.log(`image`, image)
    let res = await yardFolder.put(image)
    let url = await res.ref.getDownloadURL()
       urlArr.push(url)
    /*return yardFolder.put(image).then(() => {
      return yardFolder.getDownloadURL()
          .then((url) => {
        urlArr.push(url)
        return urlArr;
      })
    });*/
  }
  return urlArr;


}


export default {
  createUser,
  uploadYardsImages
}
