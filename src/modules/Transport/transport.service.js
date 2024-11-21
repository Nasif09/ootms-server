const Transport = require("./transport.model");


// const addDriver = async (driverId, userId) => {
//     console.log({driverId});
//     const driver = new Driver({
//         userId,
//         favourite: [{ driverId: driverId }] 
//     });
//     return await driver.save();
// }
const addTransport = async (truckInfo) => {
    const transport = new Transport(truckInfo);
    return await transport.save();
}

const getTransport = async(driverId) => {
    return await Transport.findOne({driverId}).populate('driverId', 'name');
}


module.exports = {
    addTransport,
    getTransport
}