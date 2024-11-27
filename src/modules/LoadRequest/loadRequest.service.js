const LoadRequest = require("./loadRequest.model");

const createLoadReq = async (query) => {
    var newLoadReq = new LoadRequest(query);
    return await newLoadReq.save();
}

const findloadRequests = async (query, loadmodelfields, usermodelfields) => {
    if (usermodelfields && loadmodelfields === null ) {
        return await LoadRequest.findOne(query)
        .select("-_id truckNumber") 
        .populate('driverId', usermodelfields);
    }else if(loadmodelfields && usermodelfields){
        return await LoadRequest.findOne(query).populate('loadId',loadmodelfields).populate('driverId', usermodelfields);
    }else{
        return await LoadRequest.findOne(query).populate('loadId').populate('driverId');
    }
};

const deleteOtherLoadReq = async (searchData) => {
    return await LoadRequest.deleteMany(searchData);
};


const getTransportInfo = async (driverId) => {
    return await LoadRequest.findOne(driverId).select('driverId driverId');
}

module.exports = {
    createLoadReq,
    findloadRequests,
    getTransportInfo,
    deleteOtherLoadReq
}
