const Transport = require("./transport.model");

const addTransport = async (id, truckInfo) => {
    var driverId = id;
    const transport = new Transport({
        driverId,
        transport: [ truckInfo ] 
    });
    return await transport.save();
}


const getTransport = async(driverId) => {
    return await Transport.findOne({driverId}).populate('driverId');
}


module.exports = {
    addTransport,
    getTransport
}