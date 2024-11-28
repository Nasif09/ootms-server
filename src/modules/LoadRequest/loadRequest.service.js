const { query } = require("express");
const LoadRequest = require("./loadRequest.model");

const createLoadReq = async (query) => {
    var newLoadReq = new LoadRequest(query);
    return await newLoadReq.save();
}


const deleteOtherLoadReq = async (searchData) => {
    return await LoadRequest.deleteMany(searchData);
};


// const getTransportInfo = async (driverId) => {
//     return await LoadRequest.findOne(driverId).select('driverId driverId');
// }

const findAllLoadReqById = async (id, role, drivermodelfields = null, loadmodelfields = null, populateDriver = false, populateLoad = false) => { //??isItNeeded
    if (role === 'driver') {
        const query = LoadRequest.find({ "driverId": id, requestedBy: 'driver' });
        if (populateDriver && drivermodelfields) {
            query.populate('driverId', drivermodelfields);
        }
        if (populateLoad && loadmodelfields) {
            query.populate('loadId', loadmodelfields);
        }
        return await query;
    } else if (role === 'user') {
        const query = LoadRequest.find({ "loadId": id, requestedBy: 'user' });
        if (populateDriver && drivermodelfields) {
            query.populate('driverId', drivermodelfields);
        }
        if (populateLoad && loadmodelfields) {
            query.populate('loadId', loadmodelfields);
        }
        return await query;
    }
}

const findloadRequests = async (query, loadmodelfields, usermodelfields) => {    //??deleteIt
    if (usermodelfields && loadmodelfields === null) {
        return await LoadRequest.findOne(query)
            .select("-_id truckNumber")
            .populate('driverId', usermodelfields);
    } else if (loadmodelfields && usermodelfields) {
        return await LoadRequest.findOne(query).populate('loadId', loadmodelfields).populate('driverId', usermodelfields);
    } else {
        return await LoadRequest.findOne(query).populate('loadId').populate('driverId');
    }
};

//findOne
const findloadRequest = async (query) => {
    return await LoadRequest.findOne(query);
};


const findAllLoadReq = async (query, drivermodelfields = null, loadmodelfields = null, populateDriver = false, populateLoad = false) => {
    const loadReq = LoadRequest.find(query);
    if (populateDriver && drivermodelfields) {
        loadReq.populate('driverId', drivermodelfields);
    }
    if (populateLoad && loadmodelfields) {
        loadReq.populate('loadId', loadmodelfields);
    }
    return await loadReq;
}


module.exports = {
    createLoadReq,
    findloadRequests,
    // getTransportInfo,
    deleteOtherLoadReq,
    findAllLoadReqById,
    findAllLoadReq,
    findloadRequest
}
