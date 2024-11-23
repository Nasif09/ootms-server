// const response = require("../../helpers/response");
const Load = require("./load.module");


//create load
// const addLoad = async (loadData,id) => {
//     const load = new Load({...loadData, userId: id});
//     return await load.save();
// }

const addLoad = async (id, loadData) => {
    // var userId = id;
    const load = new Load({
        userId : id,
        load: [ loadData ] 
    });
    return await load.save();
}

//find assigned load by user id
const findLoadById = async (id,role) => {
    if(role==='driver'){
        return await Load.findOne({"driverId": id});
    }else{
        return await Load.findOne({"userId": id});
    }
     
     
    //return await Load.findOne({"userId": id}).select('shipperAddress.city shipperAddress.state receiverAddress.city receiverAddress.state');
}
 

module.exports = {
    addLoad,
    findLoadById
}
