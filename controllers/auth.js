const User = require('../models/User')
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes')
const { attachCookiesToResponse, jwtHandling } = require('../utils');



const register = async (req,res)=>{
    const {name, email, password} = req.body
    if (!name || !email || !password ) throw new CustomError.BadRequestError('Please provide All Credentials')

    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists) throw new CustomError.BadRequestError('phone is Already exist')

    const user = await User.create({name, email, password})

    const readyuser = jwtHandling(user)
    const token = attachCookiesToResponse({res, user: readyuser}) // this var for testing cookies

    res.status(StatusCodes.CREATED).json({user: readyuser, Token: token});
}

const login = async (req, res)=>{
    const {email, password} = req.body
    if (!email || !password) throw new CustomError.BadRequestError('Please provide an email and password')

    const user = await User.findOne({ email })
    if (!user) throw new CustomError.UnauthenticatedError('Invalid email')

    const comparePassword = await user.comparePassword(password)
    if (!comparePassword) throw new CustomError.UnauthenticatedError('Invalid password')

    const readyuser = jwtHandling(user)
    const token = attachCookiesToResponse({res, user: readyuser})

    res.status(StatusCodes.OK).json({user: readyuser, Token: token})
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
module.exports = {register, login, logout}