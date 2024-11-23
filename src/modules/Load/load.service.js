// const response = require("../../helpers/response");
const LoadRequest = require("../LoadRequest/loadRequest.model");
const Load = require("./load.module");


// create load
const addLoad = async (loadData, id) => {
    const load = new Load({ ...loadData });
    const addedload = await load.save();

    const user = await LoadRequest.findOne({ "userId": id });
    if (!user) {
        const loadReq = new LoadRequest({
            loads: [addedload._id],
            userId: id
        });
        await loadReq.save();
    } else {
        await LoadRequest.updateOne({
            userId: id
        }, {
            $push: {
                loads: [addedload._id]
            }
        })
    }
    return true;
}


//find assigned load by user id
const findLoadById = async (id, role) => {
    if (role === 'driver') {
        return await Load.findOne({ "driverId": id });
    } else {
        return await Load.findOne({ "userId": id });
    }
}


module.exports = {
    addLoad,
    findLoadById
}
