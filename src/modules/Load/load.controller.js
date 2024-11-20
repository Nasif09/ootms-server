const response = require("../../helpers/response");
const { addLoad, findLoadById } = require("./load.service");

const createLoad = async (req, res) => {
    try {
        var loadData = req.body;
        var id = req.User.id;
        const load = await addLoad(loadData, id);
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load created Successfully", data: load }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}



//find assigned load by user id
const assignedLoad = async (req, res) => {
    try {
        const id = req.User.id;
        const load = await findLoadById(id);
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
        const id = req.User.id;
        const { driverId } = req.body;
        const loadData = await findLoadById(id);
        if (!loadData) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no load found for you" }));
        } else {
            loadData.driverId = driverId;
            const updatedLoad = await loadData.save();
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