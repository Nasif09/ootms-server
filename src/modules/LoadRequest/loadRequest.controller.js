const response = require("../../helpers/response");
const Load = require("../Load/load.module");
const { findLoadById } = require("../Load/load.service");
const { getTransport } = require("../Transport/transport.service");



const findTransportInfo = async (req, res) => {
    try {
        var driverId = req.User.id;
        const transport = await getTransport(driverId);
        if (!transport) {
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "you don't add any transport yet" }));
        }
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "transport fetched Successfull", data: transport }));

    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "Failed to fetch Transport", errors: error.message }));
    }
}

const findLoad = async (req, res) => {
    try {
        const {id, role} = req.User;
        const load = await findLoadById(id, role);

        if (!load) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No load found for you" }));
        }
        return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch load', data: load }));
    } catch (error) {
        return res.status(200).json(response({ status: "error", statusCode: '400', type: "load", message: 'failed to find load' }));
    }
}

module.exports = {
    findTransportInfo,
    findLoad
};