const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    //console.log("verify req.headers :", req.headers);

    //console.log("verify jwt file :", authHeader);

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    //console.log("verifywt token : ",token);
    jwt.verify( 
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err){
                console.log("verify jwt token : ",token);
                console.log("invalid err is :",err);
                return res.sendStatus(403); //invalid token
            } 
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            //console.log("decoded username : ",req.user);
            //console.log("decoded username : ",req.roles);

            next();
        }
    );
}

module.exports = verifyJWT