import FBI from '../../middleware/firebase'
// import firestore from "firebase";


//FBI.DB() point to => firebase.firestore()

function getUserById(currentUserId){
  return FBI.DB().collection('users').doc(currentUserId).get()
    .then(res=>{
      return res.data()
      //console.log(res.data())
    })
}

async function createNewChef(){
  debugger
  return await FBI.DB().collection('users').doc(`${window.user.uid}`).update({
    isAChef: true,
    yardId: null
  })
}

// async function updateProperties(){
//   if (){
//     return FBI.DB().collection('users').doc(`${window.user.uid}`).update({
//       isAChef: true,
//       yardId: null
//     })
//   }
//
// }

function createUser(data) {
  return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
}

async function uploadYardsImages(options) {
  console.log("option from upload", options)
  const storage = FBI.firebase.storage()
  const yardRef = storage.ref(`yardsImages/ ${options.yardId}`);
  const urlArr = await Promise.all(options.images.map(img => insertImageFile(yardRef, img)))
  //urlArr.push(options.images.map( img=>insertImageFile(yardRef,img)))
  // {
  //   console.log(img.name)
  //   const yardFolder = yardsRef.child(`${img.name}`);
  //   let res= await yardFolder.put(img)
  //   let url = await res.ref.getDownloadURL()
  //   urlArr.push(url)
  // })
  return urlArr;

  async function uploadYardsImages(option) {
    // console.log("option from upload", option)
    const storage = FBI.firebase.storage()
    // const yardsRef = storage.ref(`yardsImages/ ${user.uid}`);
    const yardsRef = storage.ref(`yardsImages/ ${Math.random()}`);
    const urlArr = []
    for (const image of option.images) {
      const yardFolder = yardsRef.child(`${Math.random()}`);
      // console.log(`image`, image)
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
  async function insertImageFile(yardRef,image)
  {
    const yardFolder = yardRef.child(`${image.name}`);
    let res= await yardFolder.put(image)
    let url = await res.ref.getDownloadURL()
    return url
  }
}


export default {
  createUser,
  uploadYardsImages,
  createNewChef,
  getUserById,
}
