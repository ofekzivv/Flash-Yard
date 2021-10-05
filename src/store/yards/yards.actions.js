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


  insertYard : async({ state,commit,dispatch },options)=>{
    const docId= FS_Yards.createYardId()
      const url = await FS.uploadYardsImages({images:options.images,yardId:docId})
      console.log("url",url)
      options.data.imagesUrl = url;
      options.data.cover=url[options.data.cover]



    //save to db
     await FS_Yards.createYard(options.data,docId)
    //save to store
     commit('insertYard',options.data)
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
