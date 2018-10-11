const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

/* GET home page. */
router.post("/signup", UserController.createUser);

module.exports = router;
