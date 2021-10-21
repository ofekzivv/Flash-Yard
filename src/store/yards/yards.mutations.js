export default {
  /******************setEditedYardId**********************************
   *      set the state.editedYardId with specific id                *
   ******************************************************************/
  setEditedYardId: ((state, id) => state.editedYardId = id),
  /******************setEditedYardId**********************************
   *      set the state.editedYard with specific yard data           *
   ******************************************************************/
  setEditedYard: ((state, yard) => {
    state.editedYard = {...yard}
  }),
  /***********************setYards****************
   *      set the state.yards                    *
   ***********************************************/
  setYards: ((state, yards) => {
    state.yardsCount = !!(yards.length)
    state.yards = state.yards.concat(yards)
  }),

  setFoodCategories:((state,foodCategories)=>{
    state.foodCatOpt=[...foodCategories]
  }),

  insertYard: ((state) => {
    state.yards.push(state.editedYard)
  }),

  resetEditedYardId: ((state) => state.editedYardId = ''),

  resetEditedYard: ((state) => {

    for (const key in state.editedYard) {
      state.editedYard[key] = ''
    }
    delete state.editedYard.id;
  }),

  editYard: ((state) => {
    const index = state.yards.findIndex(y => y.id === state.editedYard.id)
    state.yards.splice(index, 1, state.editedYard)
  }),

  deleteYard: ((state, yardId) => {
    const index = state.yards.findIndex(y => y.id === yardId)
    state.yards.splice(index, 1)
  }),


}
