const response = require("../../helpers/response");
const { addLoad, findLoadById, getLoad } = require("./load.service");

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

//get load by loadid
const findLoad = async (req, res) => {
    try {
        const {id} = req.User;
        var  {loadId} = req.body;
        var filter = { "driverId": id, "_id" : loadId }
        const load = await getLoad(filter);
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
        var filter = { "userId": id, "_id" : loadId };
        const load = await getLoad(filter);
        if (!load) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'load', message: "no load assigned by this id" }));
        } else {
            load.driverId = driverId;
            const newLoad = await load.save();
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'load', message: "Load fetched Successfully", data: newLoad }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'load', message: "Failed to create load", errors: error.message }));
    }
}

module.exports = {
    createLoad,
    findLoad,
    assignedLoad,
    assignDriver
};