import FBI from '../../middleware/firebase'
import firebaseInstance from "src/middleware/firebase";
import {log} from "@quasar/app/lib/helpers/logger";
// import firestore from "firebase";


//FBI.DB() point to => firebase.firestore()

function createUser(data) {
  return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
}

async function uploadYardsImages(options) {
  console.log("option from upload", options)
  const yardRef = FBI.firebase.storage().ref(`yardsImages/haim/${options.yardId}`);
  const urlArray=[]
  for(let img of options.images){
    urlArray.push(await insertImageFile(yardRef,img,options.yardId));
  }
   return urlArray
}

async function deleteYardsImages(options) {
  console.log("images to delete - firestore")
  await deleteImageFile(options).then(() => {
    console.log('123')
  })

}

async function getImagesUrls(yardId) {
    let urlArray = [];
    const obj = await FBI.firebase.storage().ref(`yardsImages/haim/${yardId}`).listAll()
    for(let imgRef of obj.items) {
      urlArray.push( await imgRef.getDownloadURL())
    }
    return urlArray;
}

async function insertImageFile(yardRef, image, yardId) {
  const yardFolder = yardRef.child(`${yardId}_${Math.random() * 1000}`);
  let res = await yardFolder.put(image)
  return  await res.ref.getDownloadURL()

  // let url = await res.ref.getDownloadURL()
  // return url
}

async function deleteImageFile(image) {
  const storage = FBI.firebase.storage()
  const imageRef = await storage.refFromURL(image)
  const a= await imageRef.delete()
  console.log('123')
}


export default {
  createUser,
  uploadYardsImages,
  deleteYardsImages,
  getImagesUrls
}
