import express from "express";
import * as user from "./usersController.js"
import * as games from "./gamesController.js"
export const router=express.Router()


//! Here instead of splitting the routes into a separate folder structure, we can put them all in this index. Routes are technically part of the controller. 



//user controllers
router.route('/users')
    .get(user.getUsers)
    .post(user.createUser)

//game controllers
router.route('/games')
    .get(games.getGames)

//favorites controllers

//reviews controllers

