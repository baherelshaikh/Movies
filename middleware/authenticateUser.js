const customErorr = require('../errors')
const { isTokenValid } = require('../utils')


const authenticateUser = (req, res, next)=>{
    const authHeader = req.headers["authorization"]; // Retrieve the "Authorization" header
    let token = null; // Initialize the token variable

if (authHeader) {
  const parts = authHeader.split(" "); // Split the header into parts
  if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
    token = parts[1]; // Get the token if the format is correct
  }
}
    if (!token) throw new customErorr.UnauthenticatedError('Authentication invalid')
    try {
        const { name, userId, Email, image} = isTokenValid({ token })
        req.user = { name, userId, Email, image}
        next()
    }catch{
        throw new customErorr.UnauthenticatedError('Authentication invalid')
    }
}

module.exports = {authenticateUser}