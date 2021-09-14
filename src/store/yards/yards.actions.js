import FS from "../../middleware/firestore/"
import FS_Yards from "../../middleware/firestore/yards"


export default {

  /***********************readYards****************
   *      get all yards from Firebase             *
   ***********************************************/
  readYards: async({commit})=>{
    const yards=await FS_Yards.getYards()
    commit('setYards',yards)
},


  insertYard : async({ state,commit,dispatch },option)=>{
    if (option.images) {
       // const url = await FBI.uploadEventImg({id:user.uid, file:option.file})
      const url = await FS.uploadYardsImages({images:option.images})
      console.log("url",url)
      option.data.imagesUrl = url;

    }

    //save to db
     await FS_Yards.createYard(option.data)
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
      yard=await  FS_Yards.getYardById(state.editedYardId)
    }
    commit('setEditedYard',yard)

  }

}
