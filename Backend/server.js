import dotenv from 'dotenv'
import express from "express";
import {sequelize} from './config/connection.js';
import path from 'path';
const __dirname = path.resolve()
// const path = require('path');

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = process.env.PORT || 3001;
dotenv.config();

import {router} from './controllers/index.js'

app.use('/api',router)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../Frontend/build')));
}

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../Frontend/build/index.html'));
});


// //! importing models
// import {User, Favorites, Games} from './models';

// //! controller
// const findUsers=async()=>{
//   const users = await User.findAll({
//     include:[{
//       model:Favorites
//     }]
//   })
//   console.log(JSON.stringify(users, null, 4))
//   return users;
// }

// findUsers();

// //! API or back-end route, part of controller
// app.use ("/users/favorites", (req, res)=>{
//   res.json(findUsers)
// })

// app.use("/", (req, res)=>{
//   res.send("<h1>Hello World</h1>")
// })

// Start the API server
sequelize.sync({ force: false }).then((results) => {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})}).catch((err)=>console.log(err))

