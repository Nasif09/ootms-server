const response = require("../../helpers/response");
const { addDriver, getDriverById } = require("./prefferedDriver.service");


//ADD PREFFERED DRIVER
const addPrefferedDriver = async (req, res) => {
    try {
        var { driverId } = req.body;
        var userId = req.User.id;
        const driver = await getDriverById(userId);

        console.log({ driverId });
        console.log({ userId });
        console.log({ driver });
        if (!driver) {
            const fvtdriver = await addDriver(driverId, userId);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "fvtdriver Successfull", data: fvtdriver }));
        } else {
            driver.favourite.push({ driverId });
            await driver.save();
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "fvtdriver Successfull", data: driver }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "Failed to create load", errors: error.message }));
    }
}


// user can see user's all preffered driver
const yourPrefferedDriver = async (req, res) => {
    try {
        var userId = req.User.id;
        const driver = await getDriverById(userId);
        if(!driver){
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "you have no favourite driver" }));
        }
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "your favourite driver Successfull", data: driver }));

    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "Failed to fetch your favourite driver", errors: error.message }));
    }
}

module.exports = {
    addPrefferedDriver,
    yourPrefferedDriver
};