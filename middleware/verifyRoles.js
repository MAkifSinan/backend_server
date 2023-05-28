const roles_list = require('../config/roles_list')
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401).json({"message":"verifyroles error"});
        const rolesArray = [...allowedRoles];
        //console.log("rolesArray :", rolesArray);
        const user_role= req?.roles
        console.log(req?.roles);
        console.log(user_role);
        if(user_role=="5150") {
            const result = true  // req.roles.map(role => array.includes(role)).find(val => val === true);
            console.log(result);
            next();

        }
        else {
            res.status(201).json({ 'message': `user is not admin` });
        
        }
    }
}

module.exports = verifyRoles