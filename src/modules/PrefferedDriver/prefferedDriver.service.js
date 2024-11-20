const Driver = require("./prefferedDriver.model");

const addDriver = async (driverId, userId) => {
    console.log({driverId});
    const driver = new Driver({
        userId,
        favourite: [{ driverId: driverId }] 
    });
    return await driver.save();
}

const getDriverById = async(userId) => {
    return await Driver.findOne({userId}).populate('userId', 'name email');
}

module.exports = {
    addDriver,
    getDriverById
}