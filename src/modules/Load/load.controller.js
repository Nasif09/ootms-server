const response = require("../../helpers/response");
const { getLoadById, getLoad } = require("../LoadRequest/loadRequest.service");
const { addLoad, findLoadById } = require("./load.service");

const createLoad = async (req, res) => {
    try {
        var loadData = req.body;
        const {id} = req.User;
        const load = await addLoad(loadData,id);
        console.log({load})
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load created Successfully", data: load }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}



//find assigned load by user id
const assignedLoad = async (req, res) => {
    try {
        const {id} = req.User;
        const load = await getLoadById(id);
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


//find assigned load by user id
const assignDriver = async (req, res) => {
    try {
        const { id } = req.User;
        const { driverId, loadId } = req.body;
        const loadReq = await getLoad(id, loadId);
        console.log("loadReq", loadReq);
        if (!loadReq) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no load assigned by this id" }));
        } else {

            loadReq.driverId = driverId;
            const updatedLoad = await loadReq.save();
            // const updatedload = await updateLoad(id, driverId);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load fetched Successfully", data: updatedLoad }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}

module.exports = {
    createLoad,
    assignedLoad,
    assignDriver
};