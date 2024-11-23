const response = require("../../helpers/response");
const { addTransport, getTransport } = require("./transport.service");

const addtransport = async (req, res) => {
    try {
        var { truckNumber, trailerSize, palletSpace, cdlNumber } = req.body;
        var driverId = req.User.id;
        const truckInfo = { truckNumber, trailerSize, palletSpace, cdlNumber };

        const truck = await getTransport(driverId);
        if (!truck) {
            const truck = await addTransport(driverId, truckInfo);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'transport', message: " transport added Successfully", data: truck }));
        } else {
            truck.transport.push(truckInfo);
            await truck.save();
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'transport', message: "transport added Successfully", data: truck }));
        }

    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'transport', message: "Failed to add transport", errors: error.message }));
    }
}


module.exports = {
    addtransport
};