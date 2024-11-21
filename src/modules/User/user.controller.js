const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const crypto = require('crypto');

const response = require("../../helpers/response");
const User = require("./user.model");
const { sendOTP, verifyOTP, deleteOTP } = require('../Otp/otp.service');
const { addUser, getUserByEmail, login, updateUser } = require('./user.service');
const { addToken, verifyToken, deleteToken } = require('../Token/token.controller');
const { addTransport } = require('../Transport/transport.service');
// const { use } = require('./user.route');


//signUp
const signUp = async (req, res) => {
    try {
        var { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        var otpPurpose = 'email-verification';
        await sendOTP(name, email, otpPurpose);
        const newUser = {
            name: name,
            email: email,
            role: role,
            password: hashedPassword
        };
        const signUpToken = jwt.sign(newUser, process.env.JWT_SECRECT, { expiresIn: '1h' });
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', signUpToken: signUpToken }));
    } catch (error) {
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "Signup Failed", errors: error.message }));
    }
}

//validate email for Signup
const validateEmailSignUp = async (req, res) => {
    try {
        var otpPurpose = 'email-verification';
        await verifyOTP(req.User.email, otpPurpose, req.body.otp);
        const user = await addUser(req.User);
        await deleteOTP(user.email);
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', message: "User Registered Successfully", data: user }));
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "email-verification Failed", errors: error.message }));
    }
}

//Complete your Acount
const completeAccount = async (req, res) => {
    try {
        if (req.User.role === 'user') {
            var { phone, taxid, address } = req.body;
            var id = req.User.id;
            const newUser = { phone, taxid, address };
            const user = await updateUser(newUser, id);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', message: " Acount completed Successfully", data: user }));
        }else{
            var { phone, truckNumber, trailerSize, palletSpace, cdlNumber } = req.body;
            var id = req.User.id;
            const truckInfo = { truckNumber, trailerSize, palletSpace, cdlNumber, driverId: id };
            const truck = await addTransport(truckInfo);
            await updateUser({phone}, id);
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', message: " Acount completed Successfully", data: truck }));
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "Signup Failed", errors: error.message }));
    }
}


//forget-password  
const forgetPassword = async (req, res) => {
    try {
        var { email } = req.body;

        const user = await getUserByEmail(email);
        var otpPurpose = 'forget-password';
        const otpData = await sendOTP(user.name, email, otpPurpose);
        if (otpData) {
            return res.status(200).json(response({ status: 'OK', statusCode: '200', type: 'user', message: 'OTP sent by email' }));
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "Failed to forget-password", errors: error.message }));
    }
}

// /verifyForgetPassword
const verifyForgetPassword = async (req, res) => {
    const { email, otp } = req.body;
    const user = await getUserByEmail(email);
    const otpVerified = await verifyOTP(email, 'forget-password', otp);
    if (!otpVerified) {
        return res.status(400).json(response({ status: 'Error', statusCode: '400', type: 'user', message: 'invalid-otp' }));
    }
    const token = crypto.randomBytes(32).toString('hex');

    const data = {
        token: token,
        userId: user._id,
        purpose: 'forget-password'
    }
    console.log("DATA::", data);
    await addToken(data);
    return res.status(200).json(response({ status: 'OK', statusCode: '200', type: 'user', message: 'otp-verified', forgetPasswordToken: token }));

}

// reset Password
const resetPassword = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const { email, password } = req.body;
        let token = authorization.split(" ")[1];

        const user = await getUserByEmail(email);
        const tokenVerified = await verifyToken(token, 'forget-password');

        if (!tokenVerified) {
            return res.status(400).json(response({ status: 'Error', statusCode: '400', type: 'user', message: 'invalid-token' }));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();
        await deleteToken(user._id);
        return res.status(200).json(response({ status: 'OK', statusCode: '200', type: 'user', message: 'password reset successfull' }));
    } catch (error) {
        return res.status(200).json(response({ status: 'Failed', statusCode: '500', type: 'user', message: 'fail to rest password', errors: error.message }));
    }

}

//change Password
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { email } = req.User;
        password = oldPassword;
        const user = await login({ email, password });
        console.log("User", user);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        const success = await user.save();
        if (success) {
            console.log("SUCCESSFULL");
            return res.status(400).json(response({ status: 'OK', statusCode: '200', type: 'user', message: 'your password has been changed successfully' }));
        } else {
            return res.status(400).json(response({ status: 'Failed', statusCode: '500', type: 'user', message: 'Failed!!' }));
        }

        // const isSignIn = await signIn(token.email, oldPassword);
        // if(isSignIn){
        //     const user = await getUserByEmail(token.email);
        //     user.password = newPassword;
        //     await user.save();
        //     return json(response({ status: 'OK', statusCode: '200', type: 'user', message: 'your password has been changed successfully' }));
        // }

    } catch (error) {
        console.log(error);
        return json(response({ status: 'Failed', statusCode: '500', type: 'user', message: 'fail to change password', errors: error.message }));
    }
}


//updateProfile
const updateProfile = async (req, res) => {
    try {
        if (req.files && req.files.length > 0) {
            let newUser = new User({
                image: req.files[0].filename
            })
            const userData = await newUser.save();
            return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'user', message: "Profile pic uploaded", data: userData }));
        } else {
            return res.status(400).json(response({ status: 'Fail', statusCode: '404', type: 'user', message: "file not found" }));
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'user', message: "Profile pic uploaded Failed", errors: error.message }));
    }
}


//signIn
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await login({ email, password });
        if (user) {
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image
            }
            const token = jwt.sign(payload, process.env.JWT_SECRECT, { expiresIn: '1y' });

            //set cookie
            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: process.env.JWT_EXPIRY,
                httpOnly: true,
                signed: true
            })

            return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'SignIn-success', data: user, accessToken: token }));
        } else {
            return res.status(401).json(response({ status: "Invalid", statusCode: '401', type: "user", message: 'Invalid credentials' }));
        }
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "SignIn Failed", errors: error.message }));
    }
}


//allUsers
const allUsers = async (req, res) => {
    try {
        //live search & pagination
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegEx = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            role: { $ne: "admin" },
            $or: [
                { name: { $regex: searchRegEx } },
                { email: { $regex: searchRegEx } }
            ]
        }

        const user = await User.find(filter).select({ password: 0, _id: 0, __v: 0 }).limit(limit).skip((page - 1) * limit);
        const count = await User.find(filter).countDocuments();
        const pagination = {
            TotalPage: Math.ceil(count / limit),
            CurrentPage: page,
            PreviousPage: page - 1 > 0 ? page - 1 : null,
            NextPage: (page + 1) < Math.ceil(count / limit) ? (page + 1) : null

        }
        if (!user) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "user not found" }));
        }
        return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch users', data: user, pagination: pagination }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "Failed to fetch ", errors: error.message }));
    }
}



//User
const getUsersById = async (req, res) => {
    try {
        const { id } = req.User;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "user not found" }));
        }
        return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'successfully fetch users', data: user }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "Failed to fetch ", errors: error.message }));
    }
}


//deleteAccount
const deleteAccount = async (req, res) => {
    try {
        const { id } = req.User;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'user', message: "user not found" }));
        }
        return res.status(200).json(response({ status: "OK", statusCode: '200', type: "user", message: 'users deleted', data: user }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'user', message: "Failed to delete ", errors: error.message }));
    }
}


//logout
const logout = async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("LOgoUt");
}



module.exports = {
    signUp,
    forgetPassword,
    verifyForgetPassword,
    completeAccount,
    resetPassword,
    changePassword,
    signIn,
    validateEmailSignUp,
    updateProfile,
    allUsers,
    getUsersById,
    deleteAccount,
    logout
}