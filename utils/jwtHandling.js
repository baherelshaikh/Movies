const jwtHandling = (user)=>{
    return {name: user.name, Email: user.email, userId: user._id, image: user.image}
}

module.exports = {jwtHandling}