// const response = require("../../helpers/response");
const Load = require("./load.model");


// create load
const addLoad = async (loadData, id) => {
    const newload = new Load({ ...loadData, userId: id });
    const load = await newload.save();
    return load;
}
// const addLoad = async (loadData, id) => {
//     const load = new Load({ ...loadData });
//     const addedload = await load.save();

//     const user = await LoadRequest.findOne({ "userId": id });
//     if (!user) {
//         const loadReq = new LoadRequest({
//             loads: [addedload._id],
//             userId: id
//         });
//         await loadReq.save();
//     } else {
//         await LoadRequest.updateOne({
//             userId: id
//         }, {
//             $push: {
//                 loads: [addedload._id]
//             }
//         })
//     }
//     return true;
// }


//find assigned load by user id
const findLoadById = async (id, role) => {
    if (role === 'driver') {
        return await Load.find({ "driverId": id });
    } else {
        return await Load.find({ "userId": id });
    }
    return null;
}
// const findLoadbyFilter = async (filter) => {
//     return await Load.find(filter);
    
// }


const getLoad = async (filter,find) => {
    //return await Load.findOne({ "userId": id, "_id" : loadId });
    if(find){
        return await Load.findOne(filter).select(find);
    }else{
        return await Load.findOne(filter);
    }
    return null;
}
const getallLoad = async (filter) => {
    //return await Load.findOne({ "userId": id, "_id" : loadId });
    return await Load.find(filter);
}

module.exports = {
    addLoad,
    getLoad,
    getallLoad,
    findLoadById
}
