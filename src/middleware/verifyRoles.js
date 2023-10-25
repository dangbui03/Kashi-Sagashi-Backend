const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) return res.sendStatus(401);
        const roleArray = [...allowedRoles];
        console.log(roleArray);
        console.log(req.roles);
        
    }
}