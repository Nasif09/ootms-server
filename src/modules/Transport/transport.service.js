const Transport = require("./transport.model");

const addTransport = async (transport) => {
    const newTransport = new Transport(transport);
    return await newTransport.save();
}


const getTransport = async(driverId, truckNumber) => {
    return await Transport.find({driverId: driverId, truckNumber: truckNumber}).populate('driverId');
}


module.exports = {
    addTransport,
    getTransport
}