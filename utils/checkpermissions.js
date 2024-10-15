// this page we will use if we build an admin page
const CustomErorr = require('../errors')

const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.role === 'admin') return;
    if (requestUser.userId === resourceUserId.toString()) return;
    
    throw new CustomErorr.UnauthorizedError(
        'Not authorized to access this route'
    );
};

module.exports = {checkPermissions}