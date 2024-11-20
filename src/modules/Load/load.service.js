// const response = require("../../helpers/response");
const Load = require("./load.module");


//create load
const addLoad = async (loadData,id) => {
    const load = new Load({...loadData, userId: id});
    return await load.save();
}

//find assigned load by user id
const findLoadById = async (id) => {
    return await Load.findOne({"userId": id}).select('shipperAddress.city shipperAddress.state receiverAddress.city receiverAddress.state');
}
 

module.exports = {
    addLoad,
    findLoadById
}
