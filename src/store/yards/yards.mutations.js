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
    // console.log(state.editedYard)
  }),
  /***********************setYards****************
   *      set the state.yards                    *
   ***********************************************/
  setYards: ((state, yards) => {
    state.yards = yards
  }),


  insertYard: ((state, yard) => {
    return state.yards.push(yard)
  }),

  resetEditedYardId: ((state) => state.editedYardId = ''),

  resetEditedYard: ((state) => {

    for (const key in state.editedYard) {
      state.editedYard[key] = ''
    }
    delete state.editedYard.id;
  }),

  editYard: ((state, yard) => {
    const index = state.yards.findIndex(y => y.id === yard.id)
    state.yards.splice(index, 1, yard)
  }),

  deleteYard: ((state, yardId) => {
    const index = state.yards.findIndex(y => y.id === yardId)
    state.yards.splice(index, 1)
  }),


}
