import FS_Yards from "../../middleware/firestore/yards"


export default {

  /***********************readYards****************
   *      get all yards from Firebase             *
   ***********************************************/
  readYards: async ({commit}) => {
    const yards = await FS_Yards.getYards()
    commit('setYards', yards)
  },

  createYardId: async ()=>{
    return FS_Yards.createYardId()
  },

  updateYard: async ({state, commit, dispatch}) => {
    const yard={}
    Object.assign(yard,state.editedYard)
    delete yard.id
    await FS_Yards.updateYard(yard,state.editedYard.id)
    commit('editYard')
    dispatch('reset')
  },
  getFoodCategory: async ({commit}) => {
    await FS_Yards.getFoodCat()
      .then((res) => {
        commit('setFoodCategories', res)
      })
  },


  insertYard: async ({state, commit, dispatch}) => {
    const yard={}
    Object.assign(yard,state.editedYard)
    delete yard.id

   //save to DB
    console.log('-----yards state before update DB',state.yards)
    await FS_Yards.createYard(yard,state.editedYard.id)
    console.log('after push to DB')
    //save to store
     await commit('insertYard',yard)
    console.log('after update  yards state')
    dispatch('reset')
  },
  /***************setEditedYardById****************
   *     set the EditedYard                       *
   ***********************************************/
  setEditedYardById: async ({state, commit}) => {
    let yard = {}
    if (state.yards.length && state.yards.find(y => y.id === state.editedYardId)) {
      yard = state.yards.find(yard => yard.id === state.editedYardId);
    } else {
      yard = await FS_Yards.getYardById(state.editedYardId)
    }
    commit('setEditedYard', yard)
  },
  /***************reset****************************
   *     reset editedYardId & editedYardId        *
   ***********************************************/
  reset: ({commit}) => {
    commit('resetEditedYardId')
    commit('resetEditedYard')
  }
}
