const response = require("../../helpers/response");
const { addDriver, getDriverById } = require("./prefferedDriver.service");
const Driver = require("./prefferedDriver.model");

const addPrefferedDriver = async (req, res) => {
    try {
        var { driverId } = req.body; 
        var userId = req.User.id;
        const driver = await getDriverById(userId);

        console.log({driverId});
        console.log({userId});
        console.log({driver});
        if(!driver){
            const fvtdriver = await addDriver(driverId, userId);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "fvtdriver Successfull", data: fvtdriver }));
        }else{


            driver.favourite.push({ driverId  }); 
            await driver.save();
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "fvtdriver Successfull", data: driver }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "Failed to create load", errors: error.message }));
    }
}

module.exports = {
    addPrefferedDriver
};