//const User = require('../model/User');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleNewUser = async (req, res) => {
    const { user, pwd , school_number} = req.body;
    if (!user || !pwd || !school_number) return res.status(400).json({ 'message': 'Username , password and school_number are required.' });

    // check for duplicate usernames in the db
    const duplicate = await  prisma.user.findFirst({where: { username: { equals: user,  },   },});
    //await User.findOne({ username: user }).exec(); // değiştir
    if (duplicate){
        console.log("duplicate  :",duplicate);
        return res.sendStatus(409); //Conflict 
    } 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const newUser = await prisma.user.create({
            data: {
                username: user,
                password: hashedPwd,
                role: 2001,
                school_number: school_number
 

                }
                });
        /*
                const result = await User.create({   // değiştir
            "username": user,
            "password": hashedPwd
        });*/

        console.log(newUser);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };