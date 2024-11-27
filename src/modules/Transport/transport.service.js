const Transport = require("./transport.model");

const addTransport = async (transport) => {
    const newTransport = new Transport(transport);
    return await newTransport.save();
}


const getTransport = async(filter) => {
    return await Transport.find(filter);
}


module.exports = {
    addTransport,
    getTransport
}