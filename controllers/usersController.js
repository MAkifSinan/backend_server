const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {

    if (!req?.body?.user_name) return res.status(400).json({ 'message': 'user name required.' });
    const user = await prisma.user.findFirst({
        where: {
          user_name: req.body.user_name
        },
      })
    if (!user) {
        return res.status(400).json({ "message": `No user matches with this name ${req?.body?.user_name}.` });
    }
    const deleted_user =  await prisma.user.delete({
        where: {
            id: user.id,
        },
      });
    res.json(deleted_user);

}

const getUser = async (req, res) => {
    if (!req?.body?.user_name) return res.status(400).json({ 'message': 'user name required.' });
    const user = await prisma.user.findFirst({
        where: {
          username: req?.body?.user_name
        },
      });

      if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.user_name} not found` });
    }
    res.json(user);
}

const updateUsertoAdmin = async (req, res) => {
  if (!req?.body?.user_name) return res.status(400).json({ 'message': 'user name required.' });
  const user = await prisma.user.findFirst({
      where: {
        username: req?.body?.user_name
      },
    });
    if (!user) {
      return res.status(204).json({ 'message': `User ID ${req.params.user_name} not found` });
  }
  const admin_user = await prisma.user.update({
    where: {
      id: user.id,
      },
      data: {
        role: 5150,
        }
        });
  res.json(admin_user);
}


module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUsertoAdmin
}
