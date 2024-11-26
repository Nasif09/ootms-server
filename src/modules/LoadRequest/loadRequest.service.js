const LoadRequest = require("./loadRequest.model");

const createLoadReq = async (query) => {
    var newLoadReq = new LoadRequest(query);
    return await newLoadReq.save();
}

const findloadRequests = async (query) => {
    return await LoadRequest.findOne(query);
}

const getTransportInfo = async (driverId) => {
    return await LoadRequest.findOne(driverId).select('driverId driverId');
}

module.exports = {
    createLoadReq,
    findloadRequests,
    getTransportInfo
}
