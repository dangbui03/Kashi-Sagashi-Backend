const User = require('../../model/user')

const getAllUser = async (req, res) => {
    try{
        const usert = await User.find({}).exec();
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
    try{
        const { email } = req.body;
        const userToDelete = await User.findOne({email});
        if (!userToDelete){
            return res.status(404).json({ message:"User not found" });
        }
        const name = userToDelete.name;
        await User.deleteOne({ email });
        res.status(200).json({ message: `User ${name} has been deleted`});
    }
    catch (error){
        console.error('Error',error);
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    getAllUser,
    deleteUser,
}