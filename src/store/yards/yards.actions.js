import FBI from "../../middleware/firebase/"
import FS from "../../middleware/firestore/yards"

export default {

  /***********************readYards****************
   *      get all yards from Firebase             *
   ***********************************************/
  readYards: async({commit})=>{
    const yards=await FS.getYards()
    commit('setYards',yards)
},


  insertYard : async({ state,commit,dispatch },option)=>{
     console.log('option',option)
     console.log('option',option.images)
    // console.log('option.data',option.data)
    if (option.images) {
       // const url = await FBI.uploadEventImg({id:user.uid, file:option.file})
      const url = await FS.uploadYardsImages({images:option.images})
      console.log("url",url)
      option.data.imagesUrl = url;

    }

    //save to db
     await FS.createYard(option.data)
    //save to store
     commit('insertYard',option.data)
  },
  /***************setEditedYardById****************
   *     set the EditedYard                       *
   ***********************************************/
  setEditedYardById : async({state,commit})=>{
    let yard={}
    if(state.yards.length && state.yards.find(yard=>yard.id===state.editedYardId)){
      yard=state.yards.find(yard=>yard.id===state.editedYardId);
    }
    else {
      yard=await  FS.getYardById(state.editedYardId)
    }
    commit('setEditedYard',yard)

  }

}
