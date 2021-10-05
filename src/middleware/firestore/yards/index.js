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



 function createYardId(){
  return   FBI.DB().collection('yards').doc().id
}


function getYardById(Id) {
  return FBI.DB().collection('yards').doc(Id).get()
    .then(response => response.data())
    .catch(err => console.error(err))
}
async function createYard(options,id) {
  const eventRef =  await FBI.DB().collection('yards').doc(id).set(options)
}

export default {
  getYards,
  getYardById,
  createYard,
  createYardId,
}
