const User = require ('../../model/user')
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(401).json({ message: "Jwt not found" });;
        const refreshToken = cookies.jwt;

        const foundUser =  await User.findOne({ refreshToken }).exec();
        if (!foundUser) return res.sendStatus(403); //Forbidden 
        // evaluate jwt 
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
                const roles = Object.values(foundUser.roles);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "email": decoded.email,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                );
                res.status(201).json({ roles, accessToken });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { handleRefreshToken }