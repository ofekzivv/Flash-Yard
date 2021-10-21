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
async function createYard(yard,id) {
  await FBI.DB().collection('yards').doc(id).set(yard)
  return FBI.DB().collection('users').doc(window.user.uid).update('yardId',id)
}

function updateYard(yard)
{
  return FBI.DB().collection('yards').doc(yard.yardId).update(yard)
    .then(res=>console.log(res))
    .catch(err=> console.log(err))
}
function getFoodCat()
{
      return FBI.DB().collection('food_categories').get()
          .then(res=>{
            return res.docs.map(doc=>doc.data())
          })
}
export default {
  getYards,
  getYardById,
  createYard,
  createYardId,
  updateYard,
  getFoodCat
}
