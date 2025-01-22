const authorize = (permittedRoles) => {
    return (req,res,next)=>{
        const userRole = req.user.role
        if(permittedRoles.includes(userRole)){
            next()
        }else{
            res.status(403).json({
                message:"You are not authorized for this route"
            })
        }
    }
}

module.exports = authorize 