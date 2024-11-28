const response = require("../../helpers/response");
const { createLoadReq, findloadRequests, getTransportInfo, deleteOtherLoadReq, findAllLoadReqById, findAllLoadReq, findloadRequest } = require("../LoadRequest/loadRequest.service");
const { getTransport } = require("../Transport/transport.service");
const { findUser } = require("../User/user.service");
const { search } = require("./load.route");
const { addLoad, findLoadById, getLoad, getallLoad } = require("./load.service");

const createLoad = async (req, res) => {
    try {
        var loadData = req.body;
        const { id } = req.User;
        const load = await addLoad(loadData, id);
        console.log({ load })
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load created Successfully", data: load }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}


//find my Load Request
const myLoadRequest = async (req, res) => {
    try {
        let { id, role } = req.User;
        if (role === 'user') {
            var load = await findLoadById(id, role);
            const loadId = load.map(load => load._id);
            id = loadId;
        }
        var loadmodelfields = 'loadType palletSpace shipperAddress.address shipperAddress.name receiverAddress.address';
        var drivermodelfields = 'name';
        const loadreq = await findAllLoadReqById(id, role, drivermodelfields, loadmodelfields,true , true);

        if (!loadreq) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no load found for you" }));
        } else {
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load fetched Successfully", data: loadreq }));
        }
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}

//find Load Request
const loadRequests = async (req, res) => {
    try {
        const { id, role } = req.User;
        var query = {
            status: 'requested'
        }
        if (role === 'driver') {
            query.requestedBy = { $ne: 'driver' };
            query.driverId = id
        } else if (role === 'user') {
            var userLoads = await getallLoad({ userId: id });
            if (!userLoads || userLoads.length === 0) {
                return res.status(404).json(response({
                    status: 'Not-found',
                    statusCode: '404',
                    type: 'load',
                    message: "No loads created by you."
                }));
            }
            query.requestedBy = { $ne: 'user' };
            const loadIds = userLoads.map(load => load._id);
            query.loadId = { $in: loadIds };
        }
        var loadmodelfields = 'loadType palletSpace shipperAddress.address shipperAddress.name receiverAddress.address';
        var drivermodelfields = 'name';
        const loadRequests = await findAllLoadReq(query, drivermodelfields, loadmodelfields, true , true);
        if (!loadRequests || loadRequests.length === 0) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no loadRequests  found for you" }));
        } else {
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "loadRequests fetched Successfully", data: loadRequests }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to fetched loadRequests ", errors: error.message }));
    }
}

//load Details
const loadDetails = async (req, res) => {
    try {
        var { loadId } = req.body;
        var filter = { _id: loadId };
        var find = 'description productType weight delivered pickedUp loadType shipperAddress.name shipperAddress.phone shipperAddress.email receiverAddress.name receiverAddress.phone receiverAddress.email '
        const load = await getLoad(filter, find);
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load fetched Successfully", data: load }));
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to fetched to loadDetails", errors: error.message }));
    }
}

//find Load(nearest)
const findLoad = async (req, res) => {
    try {
        var { palletSpace } = req.body;
        //console.log(typeof (palletSpace));
        var filter = {
            palletSpace: { $lte: palletSpace },
            status: { $in: ['pending', 'requested'] }
            // trailerSize,
            // loation
        }
        const load = await getallLoad(filter);

        if (!load) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No load found for you" }));
        } else {
            return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch load', data: load }));
        }

    } catch (error) {
        return res.status(200).json(response({ status: "error", statusCode: '400', type: "load", message: 'failed to find load', erros: error.message }));
    }
}

//assignLoad
const requestForLoad = async (req, res) => {
    try {
        const { id, role } = req.User;
        const { driverId, loadId, truckNumber } = req.body;
        var filter = { _id: loadId, status: { $in: ['pending', 'requested'] } };
        const load = await getLoad(filter, null);
        if (!load) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no load found by this id" }));
        } else {
            var query = {
                loadId: loadId,
                requestedBy: role,
                status: 'requested'
            }
            if (role === 'driver') {
                query.driverId = id;
                const truck = await getTransport({ truckNumber: truckNumber }, null, null, false);
                if (truck) {
                    query.truckNumber = truckNumber
                }else{
                    return res.status(404).json(response({ status: 'Not Found', statusCode: '404', type: 'transport', message: "no transport found with this truck number" }));
                }
                   
            } else {
                const driver = await findUser(driverId)
                if (driver) {
                    query.driverId = driverId
                } else {
                    return res.status(404).json(response({ status: 'Not Found', statusCode: '404', type: 'user', message: "no user found with this driver id" }));
                }
            }

            load.status = 'requested';
            const newLoad = await load.save();

            if (!newLoad) {
                return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to assign load" }));
            } else {
                await createLoadReq(query);
            }
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "assign driver successfull", data: newLoad }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to assign driver", errors: error.message }));
    }
}

const acceptLoadrequest = async (req, res) => {
    try {
        const { loadReqId } = req.body;
        const query = { _id: loadReqId, status: 'requested' };
        const loadReq = await findloadRequests(query);
        if (loadReq) {
            var filter = { _id: loadReq.loadId };
            const load = await getLoad(filter);
            load.status = 'accepted';
            load.driverId = loadReq.driverId;
            await load.save();
            loadReq.status = 'accepted';
            await loadReq.save();
            var searchData = {
                driverId: { $ne: load.driverId },
                loadId: loadReq.loadId
            }
            await deleteOtherLoadReq(searchData);

        } else {
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "no load request found" }));
        }
        return res.status(200).json(response({ status: 'Ok', statusCode: '200', type: 'load', message: "load request accepted" }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to accepted load", errors: error.message }));
    }
}

const rejectLoadrequest = async (req, res) => {
    try {
        const { loadReqId } = req.body;
        const query = { _id: loadReqId, status: 'requested' };
        const loadReq = await findloadRequest(query);
        if (loadReq) {
            loadReq.status = 'rejected';
            await loadReq.save();
        } else {
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "no load request found" }));
        }
        return res.status(200).json(response({ status: 'Ok', statusCode: '200', type: 'load', message: "load request rejected successfully" }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to rejected load", errors: error.message }));
    }
}

module.exports = {
    createLoad,
    loadDetails,
    myLoadRequest,
    loadRequests,
    requestForLoad,
    acceptLoadrequest,
    rejectLoadrequest,
    findLoad
};