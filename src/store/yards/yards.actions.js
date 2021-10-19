import FS from "../../middleware/firestore/"
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
  createMetadata: async ({dispatch},images,yardId)=>{
    await dispatch('addImag',{images:images,yardId:yardId})
    return await FS.getImagesUrls(yardId)
  },
  updateYard: async ({state, commit, dispatch}) => {

    const yard={}
    Object.assign(yard,state.editedYard)
    await FS_Yards.updateYard(yard)
    commit('editYard',yard)
    dispatch('resetState')
  },
  getFoodCategory: async ({commit}) => {
    await FS_Yards.getFoodCat()
      .then((res) => {
        commit('setFoodCategories', res)
      })
  },


  insertYard: async ({state, commit, dispatch}) => {
   //save to DB
    await FS_Yards.createYard(state.editedYard)

    //save to store
    commit('insertYard')
    dispatch('resetState')
  },
  /***************setEditedYardById****************
   *     set the EditedYard                       *
   ***********************************************/
  setEditedYardById: async ({state, commit}, id) => {
    let yard = {}
    if (state.yards.length && state.yards.find(yard => yard.yardId === state.editedYardId)) {
      yard = state.yards.find(yard => yard.yardId === state.editedYardId);
    } else {
      yard = await FS_Yards.getYardById(id)
    }
    commit('setEditedYard', yard)
  },
  resetState: ({commit}) => {
    commit('resetEditedYardId')
    commit('resetEditedYard')
  },
  getYardByUserId: ({state, commit, dispatch}, userId) => {
    return FS_Yards.getYardIdByUserId(userId)
      .then(yardId => {
        if (yardId !== null) {
          commit('setEditedYardId', yardId)
          dispatch('setEditedYardById', state.editedYardId)
        }
      }).catch(err => console.error(err))
  },

}
