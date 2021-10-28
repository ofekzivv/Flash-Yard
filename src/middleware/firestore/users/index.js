import FBI from "src/middleware/firebase";


export default {
  createUser: (data) => {
    return FBI.DB().collection('users').doc(`${window.user.uid}`).set(data)
  },
  createNewChef: async () => {
    return await FBI.DB().collection('users').doc(`${window.user.uid}`).update({
      isAChef: true,
      yardId: null
    })
  },
  getUserById: (Id) => {
    return FBI.DB().collection('users').doc(Id).get()
      .then((response) => response.data())
      .catch(err => console.error(err))
  },
  setDisableWeekdaysChef: (option) => {
    return FBI.DB().collection("users").doc(option.id).collection('days').doc(`DisableWeekdays-${option.id}`).set(option.item)
  },
  getDisableWeekdaysChef: async (id) => {
    const docRef = await FBI.DB().collection("users").doc(id).collection('days').doc(`DisableWeekdays-${id}`);
    const doc = await docRef.get()
    const data = doc.data()
    return data
  },
  setDisableDaysChef: (option) => {
    return FBI.DB().collection("users").doc(option.id).collection('days').doc(`DisableDays-${option.id}`).set(option.item)
  },
  getDisableDaysChef: async (id) => {
    const docRef = await FBI.DB().collection("users").doc(id).collection('days').doc(`DisableDays-${id}`);
    const doc = await docRef.get()
    return doc.data()
  },


}
