const User = require ('../../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    try {
        const { email, pwd } = req.body;
        if (!email || !pwd) return res.status(404).json({ 'message': 'Email and password are required.' });
        
        //checkfoundUser
        const foundUser =  await User.findOne({ email: email }).exec();
        //if (!foundUser) return res.status(404).json({'message': "Incorrect Email"});; //Unauthorized 
        
        // check user or veirified?
        if(!foundUser.verified) {
            return res.status(404).json({ message: "Email hasn't been verified yet. Check your inbox."});
        }

        // evaluate password 
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (!match || !foundUser) {
            return res.status(401).json({'message': "Incorrect Password or Email"}); 
        }
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '10d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, { httpOnly: true,  sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 }); //
        res.status(200).json({ message: "Success Login", result, accessToken });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { handleLogin };