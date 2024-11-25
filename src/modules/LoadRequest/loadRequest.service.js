const loadRequestModel = require("./loadRequest.model");

const createLoadReq = async (loadId, transportId) => {
    var newLoadReq = new loadRequestModel({ transportId, loadId, status: 'requested' });
    return await newLoadReq.save();
}

module.exports = {
    createLoadReq
}
