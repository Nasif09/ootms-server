const Transport = require("./transport.model");

const addTransport = async (transport) => {
    const newTransport = new Transport(transport);
    return await newTransport.save();
}


// const getTransport = async(filter,find,modelfields) => {
//     return await Transport.find(filter).populate('driverId', modelfields).select(find);
// }
const getTransport = async (filter, find, modelfields = null, populateDriver = false) => {
    const query = Transport.findOne(filter).select(find); 

    if (populateDriver && modelfields) {
        query.populate('driverId', modelfields);
    }

    return await query;
};


module.exports = {
    addTransport,
    getTransport
}