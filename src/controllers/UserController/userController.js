const user = require('../../model/user');
const User = require('../../model/user')

const getAllUser = async (req, res) => {
    try{
        const usert = await user.find({}).exec();
        if(!usert){
            return res.status(400).json({ message: "User not found"});
        }
        res.status(200).json(usert);
    }catch (error){
        console.error('Error:', error);
        res.status(500).json({ message: error.message});
    }
}
const deleteUser = async (req, res) =>{
    const { email } = req.body;
    try{
        const userToDelete = await user.findOne({email});
        if (!userToDelete){
            return res.status(404).json({ message:"User not found"});
        }
        await userToDelete.remove();
        res.status(204).json();
    }
    catch (error){
        console.error('Error',error);
        res.status(500).json({ message: error.message})
    }
}
 
// const giveAdminPermission = async (req, res) => {

// }

module.exports = {
    getAllUser,
    deleteUser,
}