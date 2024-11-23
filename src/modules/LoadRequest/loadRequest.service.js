const transportModel = require("../Transport/transport.model");
const LoadRequest= require("./loadRequest.model");

const getTransport = async (id) => {
    return await transportModel.findOne({ "driverId": id });
}
const getLoadById = async (id) => {
    return await LoadRequest.findOne({ "userId": id }).populate("loads");
}

//?
const getLoad = async (id, loadId) => {
    return await LoadRequest.findOne({ "userId": id, "loads._id" : loadId }).populate("loads");
}


module.exports = {
    getTransport,
    getLoadById,
    getLoad
}
