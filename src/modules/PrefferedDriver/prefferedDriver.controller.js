const response = require("../../helpers/response");
const { getUser } = require("../User/user.service");
const { addDriver, getDriverById, getDriver } = require("./prefferedDriver.service");


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

// Search preferred driver
const searchDriver = async (req, res) => {
    try {
        const search = req.query.search || '';
        
        if (!search) {
            return res.status(200).json(response({ 
                status: 'OK', 
                statusCode: '200', 
                type: 'driver', 
                message: "No search term provided", 
                data: [] 
            }));
        }
        //const searchRegEx = new RegExp('^' + search + '.*', 'i'); // Matches names or emails starting with the search term
        const searchRegEx = new RegExp('.*' + search + '.*', 'i');

        const filter = {
            role: "driver",
            $or: [
                { name: { $regex: searchRegEx } },
                { email: { $regex: searchRegEx } },
                ...(isNaN(search) ? [] : [{ phone: parseInt(search, 10) }]) // Only add phone filter if search is numeric
            ]
        };

        const drivers = await getUser(filter);

        if (!drivers || drivers.length === 0) {
            return res.status(404).json(response({ 
                status: 'Fail', 
                statusCode: '404', 
                type: 'driver', 
                message: "No driver found" 
            }));
        }

        return res.status(200).json(response({ 
            status: 'OK', 
            statusCode: '200', 
            type: 'driver', 
            message: "Fetched driver(s) successfully", 
            data: drivers 
        }));

    } catch (error) {
        console.error(error);
        return res.status(500).json(response({ 
            status: 'Fail', 
            statusCode: '500', 
            type: 'driver', 
            message: "Failed to fetch driver(s)", 
            errors: error.message 
        }));
    }
}


module.exports = {
    addPrefferedDriver,
    yourPrefferedDriver,
    searchDriver
};