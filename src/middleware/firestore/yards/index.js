import FBI from '../../../middleware/firebase'


let lastDoc = null
async function getYards() {
  let db = await FBI.DB().collection('yards').limit(3)
  if (lastDoc) {
    db = db.startAfter(lastDoc)
  }
  const yardsSnap = await db.get()
  lastDoc = yardsSnap.docs[yardsSnap.docs.length - 1]
  return yardsSnap.docs.map(doc => {
    const obj = doc.data()
    obj.id = doc.id
    return obj
  })

}

function getYardById(Id) {
  return FBI.DB().collection('yards').doc(Id).get()
    .then(response => response.data())
    .catch(err => console.error(err))
}
function createYardId(){
  return   FBI.DB().collection('yards').doc().id
}

async function createYard(options) {
  // await FBI.DB().collection('yards').doc(id).set(options)
  // return FBI.DB().collection('users').doc(window.user.uid).update('yardId',id)
  const eventRef = FBI.DB().collection('yards').doc()
  const yardUid = eventRef.id;
  eventRef.set(options).then(r => {
    FBI.DB().collection('users').doc(window.user.uid).update('yardId',yardUid)
    // console.log(r,eventRef.id)
  })
}

export default {
  getYards,
  getYardById,
  createYard,
  createYardId,
}
