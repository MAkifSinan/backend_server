//const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await  prisma.user.findFirst({where: { token: { equals: refreshToken,  },   },});  //await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403).json({"message":"user not found"}); //Forbidden 
    // evaluate jwt 
    console.log("ywt success");
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username)
            {
                //console.log("sometihng is wrong for foundUser.username !== decoded.username ")
                return res.sendStatus(403); 
            } 
            const roles = foundUser.role
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10d' }
            );
            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }