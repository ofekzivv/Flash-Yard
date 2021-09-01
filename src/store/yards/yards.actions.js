import FBI from "../../middleware/firebase/"
import FS from "../../middleware/firestore"

export default {

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

}
