const response = require("../../helpers/response");
const { addLoad, findLoadById } = require("./load.service");

const createLoad = async (req, res) => {
    try {
        var loadData = req.body;
        var {id, role} = req.User;
        const load = await findLoadById(id, role);
        console.log("Load::",load);
        if (!load) {
            const load = await addLoad(id, loadData);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load created Successfully", data: load }));
        } else {
            load.load.push(loadData);
            await load.save();
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load created Successfully", data: load }));
        }
        // const load = await addLoad(loadData, id);
        // return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load created Successfully", data: load }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}



//find assigned load by user id
const assignedLoad = async (req, res) => {
    try {
        const {id, role} = req.User;
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


//find assigned load by user id
const assignDriver = async (req, res) => {
    try {
        const {id, role} = req.User;
        const { driverId, loadId } = req.body;
        const loadData = await findLoadById(loadId, role);
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