const response = require("../../helpers/response");
const { createLoadReq, findloadRequests, getTransportInfo } = require("../LoadRequest/loadRequest.service");
const { getTransport } = require("../Transport/transport.service");
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
        const { id, role } = req.User;
        const load = await findLoadById(id, role);
        if (!load) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no load found for you" }));
        } else {
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load fetched Successfully", data: load }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}

//find Load Request
const loadRequests = async (req, res) => {
    try {
        const { id, role } = req.User;
        var query = {
            status : 'requested'
        }
        if(role === 'driver'){
            query.requestedBy = { $ne: 'driver' };
            query.driverId = id
        }else{
            var userLoads = await getallLoad({userId : id});
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
            query.loadId = { $in: loadIds }; // Match requests for any of the user's loads
        }
        const loadRequests  = await findloadRequests(query);
        if (!loadRequests || loadRequests.length === 0 ) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no loadRequests  found for you" }));
        } else {
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "loadRequests fetched Successfully", data: loadRequests  }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to fetched loadRequests ", errors: error.message }));
    }
}

//load Details
const loadDetails = async (req, res) => {
    try {
        const { id, role } = req.User;
        var { loadId } = req.body;
        var filter = { _id: loadId };
        const load = await getLoad(filter);
        if( role === 'driver'){
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load fetched Successfully", data: load }));
        }else{
            //??? not complete
            var driverId = load.driverId;
            const transport = await getTransportInfo(driverId);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'transport', message: "transport fetched Successfully", data: transport }));
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to fetched to loadDetails", errors: error.message }));
    }
}


//assignLoad
const requestForLoad = async (req, res) => {
    try {
        const { id, role } = req.User;
        const { driverId, loadId, truckNumber } = req.body;
        var filter = { _id: loadId, status: { $in: ['pending', 'requested'] } };
        const load = await getLoad(filter);
        if (!load) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no load found by this id" }));
        } else {
            var query = {
                loadId: loadId,
                requestedBy: role,
                status: 'requested'
            }
            if (role === 'driver') {
                query.driverId = id,
                query.truckNumber = truckNumber
            } else {
                query.driverId = driverId
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

const acceptLoadrequest = async (req, res) => { //???not complete
    try {
        const { loadReqId } = req.body;
        var filter = {
            loadId: loadReqId,
            status: 'requested'
        }
        var loadReq = await findloadRequests(filter);
        console.log("loadReq",loadReq);
        if(loadReq){
            loadReq.status = 'accepted';
            var _id = loadReqId;
            const load = await getLoad({_id});
            console.log("load",load);
            load.status = 'accepted';
            load.driverId = loadReq.driverId;
            await load.save();
        }else{
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "you dont have request any load"}));
        }
        return res.status(200).json(response({ status: 'Ok', statusCode: '200', type: 'load', message: "load accepted"}));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to accepted load", errors: error.message }));
    }
}

module.exports = {
    createLoad,
    loadDetails,
    myLoadRequest,
    loadRequests,
    requestForLoad,
    acceptLoadrequest
};