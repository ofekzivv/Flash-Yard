import FBI from '../../../middleware/firebase'

let lastDoc = null

async function getYards() {
  let db = await FBI.DB().collection('yards')
    .limit(3)
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
async function createYard(options) {
  const eventRef = FBI.DB().collection('yards').doc()
  const id = eventRef.id;
  eventRef.set(options).then(r => {
    console.log(r)
  })
}

export default {
  getYards,
  getYardById,
  createYard
}
