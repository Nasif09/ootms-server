const response = require("../../helpers/response");
const { getLoad } = require("../Load/load.service");



const findLoad = async (req, res) => {
    try {
        const { id } = req.User;
        var { palletSpace } = req.body;
        var filter = {
            driverId: id,
            palletSpace,
            // trailerSize,
            // loation
        }
        const load = await getLoad(filter);

        if (!load) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No load found for you" }));
        }else{
            return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch load', data: load }));
        }
        
    } catch (error) {
        return res.status(200).json(response({ status: "error", statusCode: '400', type: "load", message: 'failed to find load', erros: error.message }));
    }
}

const requestLoad = async (req, res) => {
    try {
        var { loadId, transportId } = req.body;
        var filter = {
            loadId,
            transportId,
            driverId: req.User.id,
            status: 'pending'
        }
        const load = getLoad(filter);
        if (load) {
            const loadReq = new LoadRequest({ transportId, loadId, status: 'requested' });
            const load = await loadReq.save();
            return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch load', data: load }));
        }else{
            return res.status(404).json(response({ status: "not found", statusCode: '404', type: "load", message: 'no load found' }));
        }
    } catch (error) {
        return res.status(400).json(response({ status: "error", statusCode: '400', type: "load", message: 'failed to find load', erros: error.message }));
    }
}

module.exports = {
    findLoad,
    requestLoad
};