# Kashisagashi_Backend

## Setup
1. Clone the repository.
2. Run the following command to install dependencies: `npm install`
3. Run the following command to start the server: `nodemon app`

## ENV settings

1. Create a `.env` file in the root directory.

2. Add the following attributes to the `.env` file:

DATABASE_URL=mongodb+srv://buihohaidang:nEoCATKZthqSHXdN@cluster0.xcvfblo.mongodb.net/test?retryWrites=true&w=majority
DATABASE_LOCAL=mongodb://127.0.0.1:27017/kashisagashi

API_PORT=8080

ACCESS_TOKEN_SECRET=b43a47f1e553454a8bf696eb14baaf4c071425949beb045a0643d504ea6de51ed636a1a340b1ddb42abd9f3dc961f5263c72f77820c6b87c8d1a1644a1625bc5
REFRESH_TOKEN_SECRET=595123fa6753ef1f1f9ea4c14d6ecb98e287fcf6a03f54fc1874c00b2ccddce973a710aa8a4da28abf73a5cf866f56d8ded8d37d496faa092090a0a3807e02a0

GOOGLE_CLIENT_ID=1088558682685-fcoo65ss392dt0gscujetpth9do29p5m.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
CLIENT_URL=http://127.0.0.1:8080

HOST="smtp.gmail.com"
SERVICE=gmail
PORT=587
SECURE=true
USER="kashisagashi12@gmail.com"
PASS="dfkr dish yblf raic"


function to get token: require('crypto').randomBytes(64).toString('hex')

## To run the server
2. **MongoDB**: A mongoDB instance running is required.
3. **Server**: You can start the back-end server with the following command: `npm start`

## update

git add .
git commit -m ...
git pull origin master
git checkout ...
git merge master
rùi git push -u origin ...