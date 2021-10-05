import FBI from '../../middleware/firebase'
// import firestore from "firebase";


//FBI.DB() point to => firebase.firestore()

function createUser(data) {
  return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
}

async function uploadYardsImages(options){
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


}
async function insertImageFile(yardRef,image)
{
  const yardFolder = yardRef.child(`${image.name}`);
  let res= await yardFolder.put(image)
  let url = await res.ref.getDownloadURL()
  return url
}

export default {
  createUser,
  uploadYardsImages
}
