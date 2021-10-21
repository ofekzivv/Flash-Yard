import FBI from '../../middleware/firebase'
import firebaseInstance from "src/middleware/firebase";
import {log} from "@quasar/app/lib/helpers/logger";
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
  await deleteImageFile(options)

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


}

async function deleteImageFile(image) {
  const storage = FBI.firebase.storage()
  const imageRef = await storage.refFromURL(image)
  await imageRef.delete()
}


export default {
  createUser,
  uploadYardsImages,
  deleteYardsImages,
  getUserById,
  createNewChef
}
