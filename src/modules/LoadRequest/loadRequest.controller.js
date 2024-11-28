const response = require("../../helpers/response");
//const Load = require("../Load/load.model");
const { getLoad } = require("../Load/load.service");
const { getTransport } = require("../Transport/transport.service");
const { createLoadReq, findloadRequests, findAllLoadReq } = require("./loadRequest.service");



// const findLoad = async (req, res) => {
//     try {
//         const { id } = req.User;
//         var { palletSpace } = req.body;
//         console.log(typeof (palletSpace));
//         var filter = {
//             driverId: id,
//             palletSpace: { $lte: palletSpace }
//             // trailerSize,
//             // loation
//         }
//         const load = await getallLoad(filter);

//         if (!load) {
//             return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No load found for you" }));
//         } else {
//             return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch load', data: load }));
//         }

//     } catch (error) {
//         return res.status(200).json(response({ status: "error", statusCode: '400', type: "load", message: 'failed to find load', erros: error.message }));
//     }
// }

const loadRequestDetails = async (req, res) => {
    try {
        const { role } = req.User;
        const { loadReqId } = req.body;
        var drivermodelfields = 'name phone email address';
        var query = { _id: loadReqId };
        if (role === 'user') {
            var loadRequest = await findAllLoadReq(query, drivermodelfields, null, true, false);
            if (!loadRequest) {

                return res.status(404).json(response({
                    status: "not found",
                    statusCode: '404',
                    type: "load",
                    message: 'No load request found'
                }));
            }
            var filter = { truckNumber: loadRequest[0].truckNumber };
            var find = 'truckNumber trailerSize palletSpace availablity';
            var transportInfo = await getTransport(filter, find, null, false);

            return res.status(200).json(response({status: "ok",statusCode: '200',type: "load",message: 'Load request fetched',data: {loadRequest,transportInfo}}));

        } else if (role === 'driver') {
            var loadmodelfields = 'loadType palletSpace weight pickedUp delivered shipperAddress.address shipperAddress.name receiverAddress.address';
            var loadRequest = await findAllLoadReq(query, null, loadmodelfields, false, true);
            if (!loadRequest) {
                return res.status(404).json(response({
                    status: "not found",
                    statusCode: '404',
                    type: "load",
                    message: 'No load request found'
                }));
            }
            return res.status(200).json(response({status: "ok",statusCode: '200',type: "load",message: 'Load request fetched',data: loadRequest}));
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json(response({
            status: "error",
            statusCode: '500',
            type: "load",
            message: 'Failed to fetch load request',
            error: error.message
        }));
    }
};



const requestLoad = async (req, res) => {
    try {
        var { loadId, transportId } = req.body;
        var filter = {
            _id: loadId,
            driverId: req.User.id,
            status: 'pending'
        }
        const load = await getLoad(filter);
        if (load) {
            const loadReq = await createLoadReq(loadId, transportId);
            load.status = 'requested';
            await load.save();
            return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch load', data: loadReq }));
        } else {
            return res.status(404).json(response({ status: "not found", statusCode: '404', type: "load", message: 'no load found' }));
        }
    } catch (error) {
        return res.status(400).json(response({ status: "error", statusCode: '400', type: "load", message: 'failed to find load', erros: error.message }));
    }
}

module.exports = {
    loadRequestDetails,
    requestLoad
};