const Transport = require("./load.module");

const getTransport = async (id) => {
    return await Transport.findOne({"driverId": id});
}
 

module.exports = {
    getTransport
}
